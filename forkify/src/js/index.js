import Search from './models/Search';

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
  const query = 'pizza';

  if (query) {
    store.search = new Search(query);
    await store.search.getResults();

    console.log(store.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', searchSubmitHandler);

const search = new Search('pizza');

search.getResults()