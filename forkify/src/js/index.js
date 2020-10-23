import Search from 'Models/Search';
import Recipe from 'Models/Recipe';
import ShoppingList from 'Models/ShoppingList';
import { selectors, elements, removeLoader, renderLoader } from 'Views/index';
import * as searchView from 'Views/searchView';
import * as recipeView from 'Views/recipeView';
import * as shoppingListView from 'Views/shoppingListView';

/** 
 * Global state of the app (store)
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * 
 * @constant {Object}
 */
const state = {
  shoppingList: new ShoppingList()
}

window.state = state;

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

/**
 * Handles recipe page opening via
 * recipe card click or page redirect
 */
const recipeOpenHandler = async () => {
  const id = window.location.hash.replace('#', ''); // get url hash part

  if (id) { // if id exists

    state.recipe = new Recipe(id); // save recipe in the store

    try {
      recipeView.clear();
      renderLoader(elements.recipe)

      searchView.clearHighlightedRecipe(); // clear highlighted recipe
      searchView.highlightSelectedRecipe(state.recipe.id); // highlight selected recipe

      await state.recipe.getInfo(); // get recipe info

      removeLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      throw error;
    }

  }
}

/**
 * Handles recipe servings change and updates the UI
 * @param {Event} event 
 */
const changeServingsHandler = event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings > 1) {
    state.recipe.changeServings('decrease');
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.changeServings('increase');
  }

  recipeView.updateServingsAndIngredients(state.recipe);
}

/**
 * Handles adding ingredients as shopping list items.
 * @param {Event} event 
 */
const addToListHandler = event => {
  if (event.target.matches(`.${selectors.addToListButton}, .${selectors.addToListButton} *`)) {
    state.recipe.ingredients.forEach(ingredient => {
      if (state.shoppingList.items.findIndex(item => item.name === ingredient.name) < 0) {
        shoppingListView.addItem(
          state.shoppingList.addItem(ingredient.amount, ingredient.unit, ingredient.name)
        );
      }
    });
  }
}

/**
 * Handles removing and updating the shopping list item.
 * @param {Event} event 
 */
const listItemActionHandler = event => {
  const target = event.target;
  const id = target.closest(`.${selectors.listItem}`).dataset.id;

  if (!id) return;

  switch (true) {
    // If clicked delete button
    case target.matches(`.${selectors.listItemDeleteBtn}, .${selectors.listItemDeleteBtn} *`):
      shoppingListView.removeItem(id);
      state.shoppingList.removeItem(id);
      break;
    // If clicked input
    case target.matches(`.${selectors.listItemInput}`):
      if (parseFloat(target.value) > 0) {
        state.shoppingList.updateItemAmount(id, parseFloat(target.value));
      } else {
        target.value = state.shoppingList.getItem(id).amount;
      }
      break;
    default:
      break;
  }
}

// Add event listener for the search form submit event
elements.searchForm.addEventListener('submit', searchSubmitHandler);

// Add event listener for the pagination buttons container click, then delegate the event
elements.searchPaginationContainer.addEventListener('click', paginationClickHandler);

// Add event listener for a hash change and call the recipe open handler
['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeOpenHandler));

// Add event listener for the servings change buttons
elements.recipe.addEventListener('click', changeServingsHandler);

// Add event listener for add to shopping list button click
elements.recipe.addEventListener('click', addToListHandler);

// Add event listener for remove shopping item button click
elements.shoppingList.addEventListener('click', listItemActionHandler);