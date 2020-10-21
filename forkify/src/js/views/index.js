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
  recipe: document.querySelector('.recipe')
};

/**
 * DOM elements classes
 * @constant  
  */
const elementClasses = {
  loader: 'loader',
  resultsBtn: 'results__btn',
  resultsLink: 'results__link',
  activeResultsLink: 'results__link--active'
}

/**
 * Renders loader in a parent element.
 * @param {Element} parent Parent element which will contain a loader
 */
const renderLoader = parent => {
  const loader = /*html*/`
    <div class="${elementClasses.loader}">
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
  const loader = document.querySelector(`.${elementClasses.loader}`);

  if (loader) loader.parentElement.removeChild(loader);
}

export { elements, elementClasses, renderLoader, removeLoader };