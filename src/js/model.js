//
import { API_URL, RES_PER_PAGE, INITIAL_PAGE } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarked: [],
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
    if (state.bookmarked.some(ele => ele.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadResult = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);

    data.data.recipes.map(res => {
      state.search.results.push({
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
      });
    });
  } catch (err) {
    throw err;
  }
};

export const UpdateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

export const resetResults = async function () {
  try {
    state.search.results = [];
    state.search.page = INITIAL_PAGE;
  } catch (err) {
    throw err;
  }
};

export const getResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarked.push(recipe);

  // Mark current recipe as Bookmark
  if ((recipe.id = state.recipe.id)) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Delete Bookmark
  const index = state.bookmarked.findIndex(ele => {
    ele.id === id;
  });

  state.bookmarked.splice(index, 1);

  // Mark current recipe as NOT Bookmark

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
