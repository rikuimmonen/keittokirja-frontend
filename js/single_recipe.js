'use strict';
const url = 'https://10.114.34.87/keittokirja'; // change url when uploading to server

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
const kuva = document.querySelector('#kuva');

const createRecipe = (recipe) => {
  const img = document.createElement('img');
  img.src = url + recipe.recipe_image.small;
  img.alt = 'ruokakuva';
  kuva.appendChild(img);
  console.log(recipe.recipe_image.small);


  const h1 = document.createElement('h1');
  h1.innerHTML = recipe.title;
  resepti.appendChild(h1);

  const size = document.createElement('p');
  size.innerHTML = recipe.size + ' annosta';
  resepti.appendChild(size);

  const time = document.createElement('p');
  time.innerHTML = 'Valmistusaika: ' + recipe.time + ' min';
  resepti.appendChild(time);

  const ingr = document.createElement('ul');
  for (let i = 0; i < recipe.ingredients.length; i++) {
    console.log(recipe.ingredients[i]);
    let li = document.createElement('li');
    li.innerHTML = recipe.ingredients[i];
    ingr.appendChild(li);
  }
  ainekset.appendChild(ingr);

  const kissa = document.createElement('ol');
  for (let i = 0; i < recipe.directions.length; i++) {
    console.log(recipe.directions[i]);
    let li = document.createElement('li');
    li.innerHTML = recipe.directions[i];
    kissa.appendChild(li);
  }
  console.log(kissa);
  ohjeet.appendChild(kissa);

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