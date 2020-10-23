/**
 * Represents a list of liked recipes
 */
class LikedList {
  constructor() {
    this.items = [];
  }

  /**
   * Adds a liked item to the list
   * 
   * @param {string} id 
   * @param {string} title 
   * @param {string} sourceName 
   * @param {string} image 
   * @returns {object} item
   */
  addItem(id, title, sourceName, image) {
    const item = { id, title, sourceName, image };

    this.items.push(item);

    return item;
  }

  /**
   * Deletes liked item with given id
   * from the list.
   * 
   * @param {string} id 
   */
  removeItem(id) {
    this.items.splice(this.items.findIndex(item => item.id === id), 1);
  }

  /**
   * Check if item id is in the list.
   * Returns true if yes, and false if not.
   * @param {string} id 
   * @returns {boolean}
   */
  isLiked(id) {
    return this.items.findIndex(item => item.id === id) >= 0;
  }

  /**
   * Gets the current amount of user likes.
   * @returns {number}
   */
  getLikesAmount() {
    return this.items.length;
  }
}

export default LikedList;