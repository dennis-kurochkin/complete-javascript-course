import { elements } from "./base";

/**
 * Gets input value from the search field
 */
export const getInput = () => elements.searchInput.value;

/**
 * Renders a recipe using given JSON data
 * and injects it into the search results container
 * 
 * @param {object} recipe Recipe JSON
 */
const renderRecipe = recipe => {
  let recipeHTML = /*html*/`
    <li>
      <a class="results__link" href="#${recipe.id}">
        <figure class="results__fig">
          <img src="${recipe.image}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.sourceName}</p>
        </div>
      </a>
    </li>
  `;

  elements.searchResultsContainer.insertAdjacentHTML('beforeend', recipeHTML);
}

/**
 * Creates html for a pagination button using given parameters
 * 
 * @param {number} currentPage Current page number
 * @param {string} type Type for a button. Can be 'prev' and 'next
 */
const createButton = (currentPage, type) => /*html*/`
    <button class="btn-inline results__btn--${type}" data-page="${type === 'next' ? ++currentPage : --currentPage}">
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
      </svg>
      <span>Page ${type === 'next' ? ++currentPage : --currentPage}</span>
    </button>`;

/**
 * Renders search pagination buttons
 * 
 * @param {number} currentPage Current pagination page
 * @param {number} resultsTotal Results received in total
 * @param {number} resultsPerPage Results per page
 */
const renderButtons = (currentPage, resultsTotal, resultsPerPage) => {
  const pagesTotal = Math.ceil(resultsTotal / resultsPerPage);
  let buttons;

  if (currentPage === 1 && pagesTotal > 1) { // Show 'next' button only
    buttons = createButton(currentPage, 'next');
  } else if (currentPage < pagesTotal) { // Show both buttons
    buttons = createButton(currentPage, 'prev');
    buttons += createButton(currentPage, 'next');
  } else if (currentPage === pagesTotal && pagesTotal > 1) { // Show 'prev' button only
    buttons = createButton(currentPage, 'prev');
  }

  elements.searchPaginationContainer.insertAdjacentHTML('afterbegin', buttons);
}

/**
 * Renders recipes results in the recipes list
 * 
 * @param {string[]} results Received JSON recipes results
 * @param {number} page Page number
 * @param {number} resultsPerPage Search results per page
 */
export const renderResults = (results, page = 1, resultsPerPage = 5) => {
  const start = (page * resultsPerPage) - resultsPerPage;
  const end = page * resultsPerPage;

  results.splice(start, end).forEach(renderRecipe);

  renderButtons(page, results.length, resultsPerPage);
}

/**
 * Clears search results
 */
export const clearResults = () => {
  elements.searchResultsContainer.innerHTML = '';
}

/**
 * Clears search input value
 */
export const clearInput = () => {
  elements.searchInput.value = '';
}