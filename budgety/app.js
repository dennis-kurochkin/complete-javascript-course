// Budget Data Controller

var budgetController = (function () {

  // Expense object prototype
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.getPercentage = function (totalIncome) {
      return totalIncome > 0 ? Math.round((this.value / totalIncome) * 100) : -1;
    }
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

    // Function to delete item
    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allItems[type].map(function (elem) {
        return elem.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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

    // Get percentages of all expenses
    getPercentages: function () {
      return data.allItems.exp.map(function (expense) {
        return expense.getPercentage(data.totals.inc);
      });
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
    logData: function () {
      console.log(data);
    }

  }

})();


// UI Controller

var UIController = (function () {

  var DOMElements = {
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
    // Container
    container: '.container',
    // Month
    month: '.budget__title--month',
    // Item percentage
    expensesPercentageLabel: '.item__percentage'
  }

  return {

    // Get user input values as an object
    getInput: function () {
      return {
        type: document.querySelector(DOMElements.inputType).value,
        description: document.querySelector(DOMElements.inputDescription).value,
        value: parseFloat(document.querySelector(DOMElements.inputValue).value)
      }
    },

    // Add item to the exp or inc list
    addListItem: function (obj, type) {
      var html, newHtml, insertElement;

      // Create HTML string with placeholder text

      html = '';

      if (type === 'inc') {

        insertElement = DOMElements.incomeList;

        html += "<div class='item clearfix' id='inc-%id%'>";
        html += "  <div class='item__description'>%description%</div>";
        html += "  <div class='right clearfix'>";
        html += "    <div class='item__value'>+ %value%</div>";
        html += "    <div class='item__delete'>";
        html += "        <button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button>";
        html += "    </div>";
        html += "  </div>";
        html += "</div>";

      } else if (type === 'exp') {

        insertElement = DOMElements.expenseList;

        html += "<div class='item clearfix' id='exp-%id%'>";
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

    // Delete list item
    deleteListItem: function (type, id) {
      var list;

      // Find and delete the item
      document.getElementById(`${type}-${id}`).remove();

    },

    // Clear input fields
    clearInputFields: function () {
      document
        .querySelectorAll(`${DOMElements.inputDescription}, ${DOMElements.inputValue}`)
        .forEach(function (input) {
          input.value = '';
        });

      document.querySelector(DOMElements.inputDescription).focus();
    },

    // Display budget
    displayBudget: function (data) {
      document.querySelector(DOMElements.budget).textContent = data.budget;
      document.querySelector(DOMElements.budgetIncome).textContent = data.totalInc;
      document.querySelector(DOMElements.budgetExpenses).textContent = data.totalExp;

      if (data.spentPercentage > 0) {
        document.querySelector(DOMElements.budgetSpentPercentage).textContent = data.spentPercentage + '%';
      } else {
        document.querySelector(DOMElements.budgetSpentPercentage).textContent = '--';
      }
    },

    // Display percentages
    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMElements.expensesPercentageLabel);

      fields.length && fields.forEach(function (field, index) {
        field.textContent = percentages[index] ? percentages[index] + '%' : '0%';
      });
    },

    // Get DOM strings
    getDOMStrings: function () {
      return DOMElements;
    },

    // Set current month
    setCurrentMonthAndYear: function () {
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      var monthNumber = new Date().getMonth();

      document.querySelector(DOMElements.month).textContent = months[monthNumber] + ' ' + new Date().getFullYear();
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

    document.querySelector(DOMStrings.container).addEventListener('click', ctrlDeleteItemHandler);

  }

  var updateBudget = function () {
    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return budget
    var budget = budgetController.getBudget();

    // Display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var updatePercentages = function () {
    UICtrl.displayPercentages(
      budgetCtrl.getPercentages()
    );
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

    // Update percentages
    updatePercentages();

  };

  var ctrlDeleteItemHandler = function (event) {
    var itemID, splitID, type, id, budget;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {

      // Get item's type and id
      splitID = itemID.split('-');

      type = splitID[0];
      id = parseInt(splitID[1]);

      // Delete the item from the data structure
      budgetCtrl.deleteItem(type, id);

      // Delete the item from the UI
      UICtrl.deleteListItem(type, id);

      // Update budget
      budgetCtrl.calculateBudget();

      budget = budgetCtrl.getBudget();

      UICtrl.displayBudget(budget);

      // Update percentages

    }

    updatePercentages();
  };

  return {
    init: function () {
      UICtrl.setCurrentMonthAndYear();

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