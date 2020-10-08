import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const apiKey = '6522c1a90ff64af48ed047a91ad84c99';

    try {
      const result = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${this.query}`);
      this.result = result.data.results;
    } catch (error) {
      console.log(error);
    }

  }
}