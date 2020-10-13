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

const renderButtons = (page, resultsTotal, resultsPerPage) => {
  const pages = Math.ceil(resultsTotal / resultsPerPage);

  if (page === 1) {
    
  }
}

/**
 * Renders recipes results in the recipes list
 * 
 * @param {string[]} results Received JSON recipes results
 * @param {number} page Page number
 * @param {number} resultsPerPage Search results per page
 */
export const renderResults = (results, page = 1, resultsPerPage = 5) => {
  const
    start = (page * resultsPerPage) - resultsPerPage,
    end = page * resultsPerPage;

  results.splice(start, end).forEach(renderRecipe);
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