import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`Test`);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Rendering Spinner
    recipeView.renderspinner();

    // Loding a recipe from API
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    // Rendering Recipe
    recipeView.render(model.state.recipe);

    // if (!request.ok) throw new Error(`${data.message} ${request.status}`);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResult = async function () {
  try {
    //Reseting the Result array
    model.resetResults();

    // Rendering Spinner
    resultsView.renderspinner();

    // Loding a results from API
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadResult(query);

    console.log(model.state.search.results);

    // Render the ResultView
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
