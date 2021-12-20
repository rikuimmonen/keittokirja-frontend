'use strict';
const url = 'https://10.114.34.87/keittokirja'; // change url when uploading to server

let logged;
logged = !(!sessionStorage.getItem('token') || !sessionStorage.getItem('user'));
const loggedUser = logged ? JSON.parse(sessionStorage.getItem('user')) : '';

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const recipe_id = getQParam('id');

const resepti = document.querySelector('#tiedot');
const kayttaja = document.querySelector('#kayttaja');
const ainekset = document.querySelector('#ainekset');
const ohjeet = document.querySelector('#ohjeet');
const kuva = document.querySelector('#kuva');

const createRecipe = (recipe) => {
  const img = document.createElement('img');
  img.src = url + recipe.recipe_image.big;
  img.alt = 'ruokakuva';
  kuva.appendChild(img);

  const h1 = document.createElement('h1');
  h1.innerHTML = recipe.title;
  resepti.appendChild(h1);

  const size = document.createElement('p');
  size.innerHTML = recipe.size + ' annosta';
  resepti.appendChild(size);

  const time = document.createElement('p');
  time.innerHTML = 'Valmistusaika: ' + recipe.time + ' min';
  resepti.appendChild(time);

  const date = new Date(recipe.date);
  const recipeDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' +
      date.getFullYear();
  const dateNode = document.createTextNode(recipeDate);

  if (loggedUser.id === recipe.user_id) {
    const editRecipeLink = document.createElement('a');
    editRecipeLink.href = 'edit_recipe.html?id=' + recipe_id;
    editRecipeLink.innerText = 'Muokkaa reseptiä';
    const editRecipeP = document.createElement('p')
    editRecipeP.id = 'editRecipe';
    editRecipeP.appendChild(editRecipeLink);
    kayttaja.appendChild(editRecipeP);
  }

  const user = document.createElement('p');
  const userBold = document.createElement('strong');
  userBold.innerHTML = recipe.name + '<br>';
  user.appendChild(userBold);
  user.appendChild(dateNode);
  kayttaja.appendChild(user);

  const ingr = document.createElement('ul');
  for (let i = 0; i < recipe.ingredients.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = recipe.ingredients[i];
    ingr.appendChild(li);
  }
  ainekset.appendChild(ingr);

  const kissa = document.createElement('ol');
  for (let i = 0; i < recipe.directions.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = recipe.directions[i];
    kissa.appendChild(li);
  }
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