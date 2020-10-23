import { state } from 'App/index';
import { selectors } from 'Views/index';
import * as recipeView from 'Views/recipeView';
import * as shoppingListView from 'Views/shoppingListView';

const servingsChangeButtons = {
  decrease: '.btn-decrease, .btn-decrease *',
  increase: '.btn-increase, .btn-increase *'
}

/**
 * Handles recipe servings change and updates the UI
 * @param {Event} event 
 */
const changeServings = target => {
  if (target.matches(servingsChangeButtons.decrease) && state.recipe.servings > 1) {
    state.recipe.changeServings('decrease');
  } else if (target.matches(servingsChangeButtons.increase)) {
    state.recipe.changeServings('increase');
  }

  recipeView.updateServingsAndIngredients(state.recipe);
}

/**
 * Adds recipe's ingredients as shopping list items.
 */
const addIngredientsToList = () => {
  state.recipe.ingredients.forEach(ingredient => {
    !state.shoppingList.hasItem(ingredient.name) && shoppingListView.addItem(
      state.shoppingList.addItem(ingredient.amount, ingredient.unit, ingredient.name)
    );
  });
}

const recipeActionHandler = event => {
  const target = event.target;

  switch (true) {
    // Click on servings change buttons
    case target.matches(`${servingsChangeButtons.decrease}, ${servingsChangeButtons.increase}`):
      changeServings(target);
    // Add to shopping list button clock
    case target.matches(`.${selectors.addToListButton}, .${selectors.addToListButton} *`):
      addIngredientsToList();
      break;
    default:
      break;
  }
}

export { recipeActionHandler };