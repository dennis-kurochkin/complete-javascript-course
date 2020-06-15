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

  // Data structure
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
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
    // Function to test data
    testing: function () {
      console.log(data);
    }
  }

})();



// UI Controller

var UIController = (function () {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList: '.expenses__list',
  }

  return {
    // Get user input values as an object
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
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
    },
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
  };


  var ctrlAddItemHandler = function () {
    var input, newItem, newItemType;

    // Get input data
    input = UICtrl.getInput();

    // Add item to the data structure
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // Add item to the UI
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearInputFields();

    // Calculate tht budget

    // Display the budget on the UI

    return input;
  };

  return {
    init: function () {
      setUpEventListeners();
    }
  }

})(budgetController, UIController);



// Initiate App

controller.init();