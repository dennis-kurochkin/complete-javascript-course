import axios from 'axios';
import { apiKey } from 'App/config';

/**
 * Represents a recipe
 */
class Recipe {

  /**
   * Creates recipe with an id
   * @param {string} id ID of the recipe
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * Gets recipe information based on its id
   * @returns {Recipe} Returns this
   */
  async getInfo() {
    try {
      const result = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}&includeNutrition=false`);

      this.title = result.data.title;
      this.source = result.data.sourceName;
      this.image = result.data.image;
      this.url = result.data.sourceUrl;
      this.ingredients = result.data.extendedIngredients;
      this.readyInMinutes = result.data.readyInMinutes;
      this.servings = result.data.servings;

    } catch (error) {
      throw new Error(error);
    }

    return this;
  }

  /**
   * Function to assume cooking time based on amount of ingredients
   */
  calcTime() {
    this.readyInMinutesAssumed = Math.ceil(this.ingredients.length % 3) * 15;
  }
}

export default Recipe;