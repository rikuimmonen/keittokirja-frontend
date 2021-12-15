'use strict';
const url = 'http://localhost:3001'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const recipe_id = getQParam('id');
console.log(recipe_id);

const resepti = document.querySelector('#single-recipe');

const createRecipe = (recipe) => {
  const h1 = document.createElement('h1');
  h1.innerHTML = recipe.title;
  resepti.appendChild(h1);
};

const getRecipes = async () => {
  try {
    const response = await fetch(url + '/recipe/' + recipe_id);
    const recipe = await response.json();
    console.log(recipe);
    createRecipe(recipe);
  } catch (e) {
    console.log(e.message);
  }
};

getRecipes();