import axios from 'axios';
import { apiKey } from 'App/config';

/**
 * Class representing a search
 */
class Search {
  /**
   * Create a search query
   * @param {string} query The search query
   */
  constructor(query) {
    this.query = query;
  }

  /**
   * Get results by defined search query
   * @returns {Search} Returns this value
   */
  async getResults() {
    try {
      const result = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${this.query}&addRecipeInformation=true`);
      this.result = result.data.results;

      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Search;