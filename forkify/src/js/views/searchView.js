import { elements } from "./base";

// Render a single recipe
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

// Get input value from search field
export const getInput = () => elements.searchInput.value;

// Render recipes in the recipes list
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
}

export const clearResults = () => {
  elements.searchResultsContainer.innerHTML = '';
}

export const clearInput = () => {
  elements.searchInput.value = '';
}