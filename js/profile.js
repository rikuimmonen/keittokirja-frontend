'use strict';
const url = 'http://localhost:3000';

const profiili = document.querySelector('#profiili');
const reseptilista = document.querySelector('#reseptilista')

const user_id = 1;

const createProfile = (user) => {
  const h2 = document.createElement('h2');
  h2.innerHTML = user.name;

  const h4 = document.createElement('h4');
  h4.innerHTML = user.email;

  profiili.appendChild(h2);
  profiili.appendChild(h4);
};

const createRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    console.log(recipe);

    const h4 = document.createElement('h4');
    h4.innerHTML = recipe.title;

    const li = document.createElement('li');
    li.appendChild(h4);

    reseptilista.appendChild(h4);
  });
};

const getUser = async () => {
  try {
    const response = await fetch(url + '/user/' + user_id + '/');
    const user = await response.json();
    //console.log(user);
    createProfile(user);
  } catch (e) {
    console.log(e.message);
  }
};

const getRecipes = async () => {
  try {
    const response = await fetch(url + '/user/' + user_id + '/recipe');
    const recipes = await response.json();
    //console.log(recipes);
    createRecipes(recipes);
  } catch (e) {
    console.log(e.message);
  }
};

getUser();
getRecipes();