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



var UIController = (function () {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },
    getDOMStrings: function () {
      return DOMStrings;
    }
  }

})();



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
    var input, newItem;

    // Get input data
    input = UICtrl.getInput();

    // Add item to the data structure
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // Add item to the UI

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



controller.init();