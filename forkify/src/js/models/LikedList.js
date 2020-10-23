/**
 * Represents a list of liked recipes
 */
class LikedList {
  constructor() {
    this.items = [];
  }

  addItem(id, title, author, image) {
    const item = { id, title, author, image };

    this.items.push(item);

    return item;
  }

  deleteItem(id) {
    this.items.splice(this.items.findIndex(item => item.id === id), 1);
  }

  isLiked(id) {
    return this.items.findIndex(item => item.id === id) >= 0;
  }

  getLikesAmount() {
    return this.items.length;
  }
}

export default LikedList;