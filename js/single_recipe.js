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

const resepti = document.querySelector('#tiedot');
const ainekset = document.querySelector('#ainekset');
const ohjeet = document.querySelector('#ohjeet');

const createRecipe = (recipe) => {
  const h1 = document.createElement('h1');
  h1.innerHTML = recipe.title;
  resepti.appendChild(h1);

  const size = document.createElement('p');
  size.innerHTML = recipe.size + ' annosta';
  resepti.appendChild(size);

  const time = document.createElement('p');
  time.innerHTML = 'Valmistusaika: ' + recipe.time + ' min';
  resepti.appendChild(time);

  const ul = document.createElement('ul');
  for (let i = 0; i < recipe.ingredients.length; i++) {
    console.log(recipe.ingredients[i]);
    let li = document.createElement('li');
    li.innerHTML = recipe.ingredients[i];
    ul.appendChild(li);
  }
  ainekset.appendChild(ul);
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