/**
 * DOM elements
 * @constant
 */
const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultsContainer: document.querySelector('.results__list'),
  searchResultsWrapper: document.querySelector('.results'),
  searchPaginationContainer: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  likedList: document.querySelector('.likes__list'),
  likedMenu: document.querySelector('.likes__field'),
  shoppingList: document.querySelector('.shopping__list')
};

/**
 * DOM elements classes
 * @constant  
 */
const selectors = {
  loader: 'loader',
  resultsBtn: 'results__btn',
  resultsLink: 'results__link',
  activeResultsLink: 'results__link--active',
  recipeServingsText: 'recipe__info-data--people',
  recipeIngredientsContainer: 'recipe__ingredient-list',
  recipeIngredient: 'recipe__item',
  recipeIngredientAmount: 'recipe_count',
  likeButton: 'recipe__love',
  addToListButton: 'recipe__btn',
  listItem: 'shopping__item',
  listItemDeleteBtn: 'shopping__delete',
  listItemInput: 'shopping__input'
}

/**
 * Renders loader in a parent element.
 * @param {Element} parent Parent element which will contain a loader
 */
const renderLoader = parent => {
  const loader = /*html*/`
    <div class="${selectors.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
}

/**
 * Removes loader.
 */
const removeLoader = () => {
  const loader = document.querySelector(`.${selectors.loader}`);

  if (loader) loader.parentElement.removeChild(loader);
}

export { elements, selectors, renderLoader, removeLoader };