import { elements, selectors } from "./index";

/**
 * Adds item to the UI.
 * @param {Recipe} item Recipe item
 */
const addItem = item => {
  const markup = /*html*/`
    <li data-id="${item.id}">
      <a class="likes__link" href="#${item.id}">
          <figure class="likes__fig">
              <img src="${item.image}" alt="${item.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${item.title}</h4>
              <p class="likes__author">${item.sourceName}</p>
          </div>
      </a>
  </li>`;

  elements.likedList.insertAdjacentHTML('beforeend', markup);
}

/**
 * Removes item from the list with given id.
 * @param {string} id 
 */
const removeItem = id => {
  elements.likedList.querySelector(`[data-id="${id}"]`).remove();
}

/**
 * Toggles recipe's like button if it likes or not.
 * @param {boolean} isLiked True if liked, false if not
 */
const toggleLikeButton = isLiked => {
  const iconName = isLiked ? 'icon-heart' : 'icon-heart-outlined';

  document.querySelector(`.${selectors.likeButton} use`)
    .setAttribute('href', `img/icons.svg#${iconName}`);

}

export { addItem, removeItem, toggleLikeButton };