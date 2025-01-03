//
import { isArray } from 'core-js/es/array';
import { API_URL, RES_PER_PAGE, INITIAL_PAGE, KEY } from './config.js';
import { getJson, sendJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
    sort: false,
  },
  bookmarked: [],
};

const changeStateObj = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingDuration: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = changeStateObj(data);

    if (state.bookmarked.some(ele => ele.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadResult = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}&key=${KEY}`);

    data.data.recipes.map(res => {
      state.search.results.push({
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
        ...(res.key && { key: res.key }),
      });
    });

    // fetching the Cooktime and IngredientReq and Adding it to result
    await Promise.all(
      state.search.results.map(async res => {
        // Fetch each recipe in result
        const data = await getJson(`${API_URL}/${res.id}?key=${KEY}`);
        // Adding it's Cooktime and IngReq to respect resultrecipe
        res.CookTime = data.data.recipe.cooking_time;
        res.ingredientsReq = data.data.recipe.ingredients.length;
      })
    );
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
    state.search.sort = false;
    state.search.page = INITIAL_PAGE;
  } catch (err) {
    throw err;
  }
};

const sortedArr = function (arr) {
  if (state.search.sort) {
    console.log(`Entered Sort Function`);
    const newarr = [...arr].sort((a, b) => a.CookTime - b.CookTime);
    return newarr;
  } else {
    return state.search.results;
  }
};

export const getResultPage = function (page = state.search.page) {
  state.search.page = page;
  console.log(state.search.sort);
  const results = sortedArr(state.search.results);
  // const results = state.search.results;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return results.slice(start, end);
};

const pressitData = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarked));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarked.push(recipe);

  // Mark current recipe as Bookmark
  if ((recipe.id = state.recipe.id)) state.recipe.bookmarked = true;

  pressitData();
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
  pressitData();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarked = JSON.parse(storage);
};

init();

const clearbookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearbookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong Ingredient  format! Please use the Correct Format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit: !unit ? '' : unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: newRecipe.servings,
      cooking_time: newRecipe.cookingTime,
      ingredients,
    };

    // console.log(recipe);

    const data = await sendJson(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = changeStateObj(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
