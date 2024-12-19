import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

    console.log(model.state.recipe);

    // Rendering Recipe
    recipeView.render(model.state.recipe);

    // if (!request.ok) throw new Error(`${data.message} ${request.status}`);
  } catch (err) {
    alert(`An Error Occured ${err.message}`);
  }
};

['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
