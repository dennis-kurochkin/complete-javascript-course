
import { state } from 'App/index';
import Search from 'Models/Search';
import { selectors, elements, removeLoader, renderLoader } from 'Views/index';
import * as searchView from 'Views/searchView';

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

export { searchSubmitHandler, paginationClickHandler };