import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmark.js';
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

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlUpdatingServing);
  recipeView.addHandlerAddBookmark(controladdBookmark);
  bookmarkView.addHandlerBookmarker(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerclcik(controlPaginationBtn);
};

init();
