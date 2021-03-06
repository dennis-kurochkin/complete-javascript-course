import { state } from 'App/index';
import * as likedListView from 'Views/likedListView';

/**
 * Inits liked list on window load
 */
const initLikedList = () => {
  const likedList = state.likedList;

  likedList.retrieveData();
  likedList.items.forEach(item => likedListView.addItem(item));
  
  likedListView.toggleLikedMenu(likedList.getLikesAmount());
}

/**
 * Updates liked status on liked recipe
 */
const updateLiked = () => {
  const recipe = state.recipe;
  const likedList = state.likedList;
  const id = recipe.id;

  if (likedList.isLiked(id)) { // check if recipe is already liked
    likedList.removeItem(id) // remove it from liked if it is
    likedListView.removeItem(id);
  } else {
    likedList.addItem(id, recipe.title, recipe.sourceName, recipe.image); // add it to liked else
    likedListView.addItem(recipe);
  }

  likedListView.toggleLikeButton(likedList.isLiked(id));
  likedListView.toggleLikedMenu(likedList.getLikesAmount());
}

export { initLikedList, updateLiked };