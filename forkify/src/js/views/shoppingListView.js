import { selectors, elements } from "./index";

/**
 * Adds ingredient item to the shopping list.
 * @param {object} item Ingredient
 */
const addItem = item => {
  const markup = /*html*/`
    <li class="${selectors.listItem}" data-id="${item.id}">
      <div class="shopping__count">
          <input type="number" class="${selectors.listItemInput}" value="${item.amount}" step="${item.amount}">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.name}</p>
      <button class="${selectors.listItemDeleteBtn} btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>`;

  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

/**
 * Removes item with given id from the shopping list.
 * @param {strong} id 
 */
const removeItem = id => {
  document.querySelector(`.${selectors.listItem}[data-id="${id}"]`).remove();
}

export { addItem, removeItem };