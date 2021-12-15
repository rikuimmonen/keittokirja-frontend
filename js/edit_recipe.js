'use strict';
const url = 'https://10.114.34.87/keittokirja';

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const recipe_id = getQParam('id');

const ingredientInput = (i) => {
  return `
        <li id="add-ingredient-${i}">
        <label for="ingredient-${i}">Ainesosa</label>
        <input type="text" name="recipeIngredient" id="ingredient-${i}" class="ingredients">
        </li>
        `;
};

const directionInput = (i) => {
  return `
        <li id="add-direction-${i}">
        <label for="direction-${i}">Työvaihe</label>
        <textarea name="recipeDirection" id="direction-${i}" class="directions"></textarea>
        </li>
        `;
};

const title = document.querySelector('#recipeTitle');
const size = document.querySelector('#recipeSize');
const time = document.querySelector('#recipeTime');
const ingredientsList = document.querySelector('#ingredients ul');
const directionsList = document.querySelector('#directions ol');

const getRecipe = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/recipe/' + id, fetchOptions);
  const recipe = await response.json();
  title.value = recipe.title;
  size.value = recipe.size;
  time.value = recipe.time;
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList.insertAdjacentHTML('beforeend', ingredientInput(i));
    document.querySelector('#ingredient-' + i).value = recipe.ingredients[i];
  }
  for (let i = 0; i < recipe.directions.length; i++) {
    directionsList.insertAdjacentHTML('beforeend', directionInput(i));
    document.querySelector('#direction-' + i).value = recipe.directions[i];
  }
};

getRecipe(recipe_id);

console.log(document.getElementsByClassName('ingredients'));

const editRecipe = document.querySelector('#editRecipe');
editRecipe.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = {};
  data.recipeTitle = title.value;
  data.recipeSize = size.value;
  data.recipeTime = time.value;

  let recipeIngredient = [];
  const ingredients = document.getElementsByClassName('ingredients');
  for (let i = 0; i < ingredients.length; i++) {
    recipeIngredient.push(ingredients[i].value);
  }
  data.recipeIngredient = recipeIngredient;

  let recipeDirection = [];
  const directions = document.getElementsByClassName('directions');
  for (let i = 0; i < directions.length; i++) {
    recipeDirection.push(directions[i].value);
  }
  data.recipeDirection = recipeDirection;

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/recipe/' + recipe_id, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  //location.href = 'front.html';
});

(async () => {
  'use strict';
  const url = 'https://10.114.34.87/keittokirja'; // change url when uploading to server

  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    if (!response.ok) {
      //location.href = 'logout.html';
    } else {
      const json = await response.json();
      sessionStorage.setItem('user', JSON.stringify(json.user));
    }
  } catch (e) {
    console.log(e.message);
  }
})();