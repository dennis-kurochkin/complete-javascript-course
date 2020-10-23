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
      this.image = result.data.image;
      this.sourceName = result.data.sourceName;
      this.sourceUrl = result.data.sourceUrl;
      this.ingredients = result.data.extendedIngredients;
      this.readyInMinutes = result.data.readyInMinutes;
      this.servings = result.data.servings;

      return this;
    } catch (error) {
      throw error;
    }
  }

  changeServings(type) {
    const updatedServings = type === 'decrease' ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(ingredient => {
      ingredient.amount *= updatedServings / this.servings;
    });

    this.servings = updatedServings;
  }
}

export default Recipe;