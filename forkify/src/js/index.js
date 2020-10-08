import axios from 'axios';

async function getResults(query) {
  const apiKey = '6522c1a90ff64af48ed047a91ad84c99';

  try {
    const result = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`);
    const recipes = result.data.results;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }

}

getResults('potato');

// API key 6522c1a90ff64af48ed047a91ad84c99
// https://api.spoonacular.com/recipes