import Search from 'Models/Search';
import Recipe from 'Models/Recipe';
import { elementClasses, elements, removeLoader, renderLoader } from 'Views';
import * as searchView from 'Views/searchView';

/** 
 * Global state of the app (store)
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * 
 * @constant {Object}
 */
const store = {}

/**
 * Handles search form submit
 * 
 * @param {Event} event Event object
 */
const searchSubmitHandler = async event => {
  event.preventDefault();

  // Get query from the view
  const query = searchView.getInput();

  if (query) {
    // Get a search query
    store.search = new Search(query);

    // Clear old results
    searchView.clearInput();
    searchView.clearResults();

    // Add a loader
    renderLoader(elements.searchResultsWrapper);

    // Get search results
    await store.search.getResults();

    // Change state in store
    removeLoader();
    searchView.renderResults(store.search.result);
  }
}

/**
 * Handles pagination container click event
 * and delegates it to the pagination buttons
 * 
 * @param {Event} event Event object
 */
const paginationClickHandler = event => {
  const paginationButton = event.target.closest(`.${elementClasses.resultsBtn}`); // get the button

  if (paginationButton) { // check if it exists
    const pageToGo = parseInt(paginationButton.dataset.pageToGo); // get the page to go to number

    searchView.clearResults();
    searchView.renderResults(store.search.result, pageToGo);
  }
}

const recipeOpenHandler = async () => {
  const id = window.location.hash.replace('#', ''); // get url hash part

  if (id) { // if id exists

    store.recipe = new Recipe(id); // save recipe in the store

    await store.recipe.getInfo(); // get recipe info

    store.recipe.calcTime(); // calculate recipe cooking time

    console.log(store.recipe);

  }
}

// Add event listener for the search form submit event
elements.searchForm.addEventListener('submit', searchSubmitHandler);

// Add event listener for the pagination buttons container click, then delegate the event
elements.searchPaginationContainer.addEventListener('click', paginationClickHandler);

// Add event listener for a hash change and call the recipe open handler
window.addEventListener('hashchange', recipeOpenHandler)