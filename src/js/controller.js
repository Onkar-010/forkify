import * as model from './model.js';
import recipeView from './views/recipeView.js';
import sortView from './views/sortView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmark.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

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
    // update Result Veiw to mark search result
    resultsView.update(model.getResultPage());

    // Updating Bookmark View
    bookmarkView.update(model.state.bookmarked);

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
    console.log(err);
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

    // Render the intial ResultView and Pagination Btn
    // debugger;

    sortView.render(model.state.search);
    resultsView.render(model.getResultPage(model.state.search.page));
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPaginationBtn = function (goTo) {
  // Render the NEW ResultView and Pagination Btn
  resultsView.render(model.getResultPage(goTo));
  paginationView.render(model.state.search);
};

const controlUpdatingServing = function (newServing) {
  // Updating the Serving Property
  model.UpdateServing(newServing);

  // Updating Recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controladdBookmark = function () {
  // Add Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // Delete Bookmark
  else model.deleteBookmark(model.state.recipe.id);

  // Updating the View
  recipeView.update(model.state.recipe);

  // Render Bookmark View
  bookmarkView.render(model.state.bookmarked);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarked);
};

const controlRecipeUpload = async function (newRecipe) {
  try {
    console.log(newRecipe);

    // Render Spinner
    addRecipeView.renderspinner();

    // Upload an Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render uploaded Recipe
    recipeView.render(model.state.recipe);

    // Secces Message
    addRecipeView.renderMessage();

    // Render Bookmark
    bookmarkView.render(model.state.bookmarked);

    // changed ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the Model Window
    setTimeout(function () {
      addRecipeView.togglewindow();
    }, MODEL_CLOSE_SEC);
  } catch (err) {
    console.error(err, err.message);
    addRecipeView.renderErrorMessage(err.message);
  }
};

const controlSortting = function (sortState) {
  // Change sort state in model
  model.state.search.sort = sortState;
  // update the dataset in sortBtn
  sortView.update(model.state.search);
  // update the Results view
  resultsView.update(model.getResultPage());
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlUpdatingServing);
  recipeView.addHandlerAddBookmark(controladdBookmark);
  bookmarkView.addHandlerBookmarker(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerclcik(controlPaginationBtn);
  addRecipeView._addHandlerUpload(controlRecipeUpload);
  sortView.addHandlerSortBtn(controlSortting);
  // addRecipeView._addHandlerOpenModel();
  // addRecipeView._addHandlerCloseModel();
};

init();
