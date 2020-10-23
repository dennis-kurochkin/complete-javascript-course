import { nanoid } from 'nanoid';

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
   * @param {string} name 
   * @returns {object} item
   */
  addItem(amount, unit, name) {
    const item = { id: nanoid(), amount, unit, name };

    this.items.push(item);

    return item;
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

  /**
   * Gets item from the list using given id.
   * @param {string} id 
   * @returns {object} shopping list item
   */
  getItem(id) {
    return this.items.find(item => item.id === id);
  }
}

export default ShoppingList;