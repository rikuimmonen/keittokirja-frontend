'use strict';
const url = 'https://10.114.34.87/keittokirja'; // change url when uploading to server

const kontti = document.querySelector('#recipes');

const createRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    console.log(recipe);
    const content = document.createElement('div');
    content.classList.add('kortti');

    const img = document.createElement('img');
    //img.src = url + recipe.recipe_image.small;
    img.src = 'https://placekitten.com/400/300';
    img.alt = 'ruokakuva';
    content.appendChild(img);
    //console.log(recipe.recipe_image.small);

    const otsikko = document.createElement('h3');
    //otsikko.innerHTML = recipe.title;
    content.appendChild(otsikko);

    let id = recipe.recipe_id;

    const a = document.createElement('a');
    a.innerHTML = recipe.title;
    a.setAttribute('href', 'single_recipe.html?id=' + id);
    otsikko.appendChild(a);

    const size = document.createElement('p');
    size.innerHTML = recipe.size + ' annosta';
    content.appendChild(size);

    const time = document.createElement('p');
    time.innerHTML = 'Valmistusaika: ' + recipe.time + ' min';
    content.appendChild(time);

    kontti.appendChild(content);
  });
};

const getRecipes = async () => {
  try {
    const response = await fetch(url + '/recipe');
    const recipes = await response.json();
    console.log(recipes);
    createRecipes(recipes);
  } catch (e) {
    console.log(e.message);
  }
};

getRecipes();