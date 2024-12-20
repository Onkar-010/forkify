import { API_URL } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingDuration: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadResult = async function (query) {
  try {
    console.log(`Enterned Model`);
    const data = await getJson(`${API_URL}?search=${query}`);

    data.data.recipes.map(res => {
      state.search.results.push({
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
      });
    });

    console.log(`Modified the State`);
  } catch (err) {
    throw err;
  }
};

export const resetResults = async function () {
  try {
    state.search.results = [];
  } catch (err) {
    throw err;
  }
};
