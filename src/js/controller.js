const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// Loding a recipe from API

console.log(`Test`);

const showRecipe = async function () {
  try {
    const request = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await request.json();
    let { recipe } = data.data;
    console.log(recipe);
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingDuration: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    if (!request.ok) throw new Error(`${data.message} ${request.status}`);
  } catch (err) {
    alert(`An Error Occured ${err.message}`);
  }
};

showRecipe();
