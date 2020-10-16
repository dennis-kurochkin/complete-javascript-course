import axios from 'axios';


export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${this.query}&addRecipeInformation=true`);
      this.result = result.data.results;
    } catch (error) {
      console.log(error);
    }
  }
}