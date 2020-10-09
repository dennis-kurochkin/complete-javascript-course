import Search from './models/Search';
import { elements } from './views/base';
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
    store.search = new Search(query);

    await store.search.getResults();

    searchView.clearInput();
    searchView.clearResults();

    searchView.renderResults(store.search.result);
  }
}

elements.searchForm.addEventListener('submit', searchSubmitHandler);

const search = new Search('pizza');

search.getResults()