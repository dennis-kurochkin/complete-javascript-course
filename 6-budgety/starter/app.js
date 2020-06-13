var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

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
    addItem: function(type, desc, val) {
      // if (type )
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
    var input = UICtrl.getInput();
  };

  return {
    init: function () {
      setUpEventListeners();
    }
  }

})(budgetController, UIController);



controller.init();