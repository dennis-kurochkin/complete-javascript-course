import Search from './models/Search';
import { elements, removeLoader, renderLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global state of the app (store)
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const store = {

}

const searchSubmitHandler = async e => {
  e.preventDefault();

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
    searchView.renderResults(store.search.result, 3, 3);
  }
}

elements.searchForm.addEventListener('submit', searchSubmitHandler);

const search = new Search('pizza');

search.getResults()