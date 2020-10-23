import { state } from 'App/index';
import { selectors } from 'Views/index';
import * as shoppingListView from 'Views/shoppingListView';

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

export { listItemActionHandler };