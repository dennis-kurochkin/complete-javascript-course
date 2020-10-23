import Recipe from 'Models/Recipe';
import ShoppingList from 'Models/ShoppingList';
import { elements, removeLoader, renderLoader } from 'Views/index';
import * as searchView from 'Views/searchView';
import * as recipeView from 'Views/recipeView';
import * as recipeController from 'Controllers/recipeController';
import * as searchController from 'Controllers/searchController';
import * as shoppingListController from 'Controllers/shoppingListController';

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

// Add event listener for a hash change and call the recipe open handler
['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeOpenHandler));

// Add event listener for the search form submit event
elements.searchForm.addEventListener('submit', searchController.searchSubmitHandler);

// Add event listener for the pagination buttons container click, then delegate the event
elements.searchPaginationContainer.addEventListener('click', searchController.paginationClickHandler);

// Add event listener for the servings change buttons
elements.recipe.addEventListener('click', recipeController.recipeActionHandler);

// Add event listener for remove shopping item button click
elements.shoppingList.addEventListener('click', shoppingListController.listItemActionHandler);

export { state };