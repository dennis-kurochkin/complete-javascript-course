// Budget Data Controller

var budgetController = (function () {

  // Expense object prototype
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Income object prototype
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Calculate total
  var calculateTotal = function (type) {
    var total = 0;

    data.allItems[type].forEach(function (elem) {
      total += elem.value;
    });

    data.totals[type] = total;
  };

  // Data structure
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    spentPercentage: -1
  }

  return {
    // Function to add item
    addItem: function (type, desc, val) {
      var id, newItem;

      // Create an id for a new item
      id = 0;

      if (data.allItems[type].length > 0)
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;

      // Create new item based on its type
      if (type === 'inc') {
        newItem = new Income(id, desc, val);
      } else if (type === 'exp') {
        newItem = new Expense(id, desc, val);
      }

      // Push new item to the data structure
      data.allItems[type].push(newItem);

      // Return new item
      return newItem;
    },
    // Function to calculate budget data
    calculateBudget: function () {

      // Calculate totals
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income user spent
      if (data.totals.inc > 0)
        data.spentPercentage = Math.round((data.totals.exp / data.totals.inc) * 100);

    },
    // Get budget
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        spentPercentage: data.spentPercentage
      }
    },
    // Function to test data
    testing: function () {
      console.log(data);
    }
  }

})();



// UI Controller

var UIController = (function () {

  var DOMStrings = {
    // Top budget panel
    budget: '.budget__value',
    budgetIncome: '.budget__income--value',
    budgetExpenses: '.budget__expenses--value',
    budgetSpentPercentage: '.budget__expenses--percentage',
    // User inputs
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    // Lists
    incomeList: '.income__list',
    expenseList: '.expenses__list',

  }

  return {
    // Get user input values as an object
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
    },
    // Add item to the exp or inc list
    addListItem: function (obj, type) {
      var html, newHtml, insertElement;

      // Create HTML string with placeholder text

      html = '';

      if (type === 'inc') {

        insertElement = DOMStrings.incomeList;

        html += "<div class='item clearfix' id='income-%id%'>";
        html += "  <div class='item__description'>%description%</div>";
        html += "  <div class='right clearfix'>";
        html += "    <div class='item__value'>+ %value%</div>";
        html += "    <div class='item__delete'>";
        html += "        <button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button>";
        html += "    </div>";
        html += "  </div>";
        html += "</div>";

      } else if (type === 'exp') {

        insertElement = DOMStrings.expenseList;

        html += "<div class='item clearfix' id='expense-%id%'>";
        html += "  <div class='item__description'>%description%</div>";
        html += "  <div class='right clearfix'>";
        html += "    <div class='item__value'>- %value%</div>";
        html += "    <div class='item__percentage'>21%</div>";
        html += "    <div class='item__delete'>";
        html += "      <button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button>";
        html += "    </div>";
        html += "  </div>";
        html += "</div>";

      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML to the DOM
      document.querySelector(insertElement).insertAdjacentHTML('beforeend', newHtml);

    },
    // Clear input fields
    clearInputFields: function () {
      document
        .querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`)
        .forEach(function (input) {
          input.value = '';
        });

      document.querySelector(DOMStrings.inputDescription).focus();
    },
    // Display budget
    displayBudget: function (data) {
      document.querySelector(DOMStrings.budget).textContent = data.budget;
      document.querySelector(DOMStrings.budgetIncome).textContent = data.totalInc;
      document.querySelector(DOMStrings.budgetExpenses).textContent = data.totalExp;

      if (data.spentPercentage > 0) {
        document.querySelector(DOMStrings.budgetSpentPercentage).textContent = data.spentPercentage + '%';
      } else {
        document.querySelector(DOMStrings.budgetSpentPercentage).textContent = '--';
      }
    },
    // Get DOM strings
    getDOMStrings: function () {
      return DOMStrings;
    }
  }

})();



// Main Controller

var controller = (function (budgetCtrl, UICtrl) {

  var setUpEventListeners = function () {
    var DOMStrings = UICtrl.getDOMStrings();

    document.querySelector(DOMStrings.addBtn).addEventListener('click', ctrlAddItemHandler);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
        ctrlAddItemHandler();
      }
    });
  }

  var updateBudget = function () {
    var DOMStrings = UICtrl.getDOMStrings();

    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return budget
    var budget = budgetController.getBudget();

    // Display the budget on the UI
    UICtrl.displayBudget(budget);

  }

  var ctrlAddItemHandler = function () {
    var input, newItem;

    // Get input data
    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // Add item to the data structure
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add item to the UI
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearInputFields();

      // Calculate and update budget
      updateBudget();
    }
  };

  return {
    init: function () {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        spentPercentage: -1
      });
      setUpEventListeners();
    }
  }

})(budgetController, UIController);



// Initiate App

controller.init();