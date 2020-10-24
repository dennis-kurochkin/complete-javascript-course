
import { state } from 'App/index';
import Search from 'Models/Search';
import { selectors, elements, removeLoader, renderLoader } from 'Views/index';
import * as searchView from 'Views/searchView';

/**
 * Persist search query in the local storage.
 * @param {string} query 
 */
const persistQuery = query => {
  localStorage.setItem('query', query);
}

/**
 * Retrieves search query from the local storage.
 */
const retrieveQuery = () => {
  return localStorage.getItem('query');
}

/**
 * Handles search form submit
 * 
 * @param {Event} event 
 */
const searchSubmitHandler = async event => {
  event.preventDefault();

  // Get query from the view
  const query = searchView.getInput();

  if (query) {
    // Get a search query
    state.search = new Search(query);

    // Persist query in local storage
    persistQuery(query);

    // Clear old results
    searchView.clearInput();
    searchView.clearResults();

    // Add a loader
    renderLoader(elements.searchResultsWrapper);

    try {
      // Get search results
      await state.search.getResults();

      // Change state in store
      removeLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      removeLoader();
      throw error;
    }

  }
}

/**
 * Inits last search results on page load.
 */
const initSearch = async () => {
  const query = retrieveQuery();

  if (query && query.length > 0) {
    // Get a search query
    state.search = new Search(query);

    // Clear old results
    searchView.clearInput();
    searchView.clearResults();

    // Add a loader
    renderLoader(elements.searchResultsWrapper);

    try {
      // Get search results
      await state.search.getResults();

      // Change state in store
      removeLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      removeLoader();
      throw error;
    }
  }
}

/**
 * Handles pagination container click event
 * and delegates it to the pagination buttons
 * 
 * @param {Event} event 
 */
const paginationClickHandler = event => {
  const paginationButton = event.target.closest(`.${selectors.resultsBtn}`); // get the button

  if (paginationButton) { // check if it exists
    const pageToGo = parseInt(paginationButton.dataset.pageToGo); // get the page to go to number

    searchView.clearResults();
    searchView.renderResults(state.search.result, pageToGo);
  }
}

export { searchSubmitHandler, initSearch, paginationClickHandler };