import { elementClasses, elements } from "./index";
import Fraction from 'fraction.js';

/**
 * Clears recipe container.
 */
const clear = () => {
  elements.recipe.innerHTML = '';
}

/**
 * Formats the amount of the passed ingredient.
 * @param {number} amount The amount of ingredient to format
 * @returns {string|number} Formatted ingredient amount
 */
const formatIngredientAmount = amount => {
  if (amount) {
    const [int, dec] = amount.toString().split('.').map(number => parseInt(number));
    let fraction;

    switch (true) {
      case !dec:
        return amount;
      case int === 0:
        fraction = new Fraction(amount);
        return `${fraction.n}/${fraction.d}`;
      default:
        fraction = new Fraction(amount - int);
        return `${int} ${fraction.n}/${fraction.d}`;
    }
  } else {
    return 'some';
  }
}

/**
 * Creates a HTML string of an ingredient
 * with a given data.
 * 
 * @param {object} ingredient 
 * @returns {string} ingredient HTML
 */
const createIngredient = ingredient => /*html*/`
    <li class="${elementClasses.recipeIngredient}">
      <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
      </svg>
      <div class="${elementClasses.recipeIngredientAmount}">
        ${formatIngredientAmount(ingredient.amount)}
      </div>
      <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.name}
      </div>
    </li>`;

/**
 * Renders recipe with a given data.
 * @param {Recipe} recipe 
 */
const renderRecipe = recipe => {
  const markup = /*html*/`
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.readyInMinutes}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>

      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data ${elementClasses.recipeServingsText}">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
          <button class="btn-tiny btn-decrease">
            <svg>
              <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
          </button>
          <button class="btn-tiny btn-increase">
            <svg>
              <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
          </button>
        </div>

      </div>
      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
      </button>
  </div>

  <div class="recipe__ingredients">
    <ul class="${elementClasses.recipeIngredientsContainer}">

      ${recipe.extendedIngredients.map(createIngredient).join('')}
      
    </ul>

    <button class="btn-small recipe__btn">
      <svg class="search__icon">
        <use href="img/icons.svg#icon-shopping-cart"></use>
      </svg>
      <span>Add to shopping list</span>
    </button>
  </div>

  <div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__by">${recipe.sourceName}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${recipe.sourceUrl}" target="_blank">
      <span>Directions</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>
    </a>
  </div>`;

  elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

/**
 * Updates servings and ingredients in recipe UI
 * @param {Recipe} recipe 
 */
const updateServingsAndIngredients = recipe => {
  document.querySelector(`.${elementClasses.recipeServingsText}`).textContent
    = recipe.servings;

  document.querySelectorAll(`.${elementClasses.recipeIngredientAmount}`)
    .forEach((ingredient, index) => {
      ingredient.textContent = formatIngredientAmount(recipe.extendedIngredients[index].amount);
    })
}

export { clear, createIngredient, renderRecipe, updateServingsAndIngredients };