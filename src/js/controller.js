import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

    // Render the intial ResultView and Pagination Btn
    resultsView.render(model.getResultPage(2));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPaginationBtn = function (goTo) {
  // Render the NEW ResultView and Pagination Btn
  resultsView.render(model.getResultPage(goTo));
  paginationView.render(model.state.search);
};

const controlUpdatingServing = function (newServing) {
  // Updating the Serving Property
  model.UpdateServing(newServing);

  // Rendering Recipe
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlUpdatingServing);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerclcik(controlPaginationBtn);
};

init();
