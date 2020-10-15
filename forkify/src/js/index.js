import Search from './models/Search';
import { elementClasses, elements, removeLoader, renderLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global state of the app (store)
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
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

// Add event listener for the search form submit event
elements.searchForm.addEventListener('submit', searchSubmitHandler);

// Add events listener for the pagination buttons container click, then delegate the event
elements.searchPaginationContainer.addEventListener('click', paginationClickHandler);

const search = new Search('pizza');

search.getResults();