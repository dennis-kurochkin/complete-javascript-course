import {nanoid} from 'nanoid';

/**
 * Represent a shopping list
 */
class ShoppingList {
  constructor() {
    this.items = [];
  }

  /**
   * Adds item to the shopping list.
   * 
   * @param {number} amount 
   * @param {string} unit
   * @param {string} ingredient 
   */
  addItem(amount, unit, ingredient) {
    this.items.push({ id: nanoid(), amount, unit, ingredient });
  }

  /**
   * Removes item from the shopping list.
   * @param {string} id 
   */
  removeItem(id) {
    this.items.splice(this.items.findIndex(item => item.id === id), 1);
  }

  /**
   * Updates item's amount in the shopping list.
   * @param {string} id 
   * @param {number} newAmount New amount
   */
  updateItemAmount(id, newAmount) {
    this.items.find(item => item.id === id).amount = newAmount;
  }
}

export default ShoppingList;