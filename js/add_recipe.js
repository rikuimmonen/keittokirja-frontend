const form = document.querySelector('#addRecipe')

let logged;

logged = !(!sessionStorage.getItem('token') || !sessionStorage.getItem('user'));

if (logged === false) {
  console.log('lol');
  location.href = 'login.html';
}

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(form);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch('https://10.114.34.87/keittokirja/recipe/', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'index.html';
});

const ingredientsList = document.querySelector('#ingredients ul');
const ingredientInput = (i) => {
  return `
        <li id="add-ingredient-${i}">
        <label for="ingredient-${i}">Ainesosa</label>
        <input type="text" name="recipeIngredient" id="ingredient-${i}" class="ingredients">
        <i class="fas fa-minus-circle" id="delete-ingredient-${i}" type="button"></i>
        </li>
        `;
};
const newIngredientButton = document.querySelector('#add-ingredient');

newIngredientButton.addEventListener('click', () => {
  let i = ingredientsList.children.length + 1;

  ingredientsList.insertAdjacentHTML('beforeend', ingredientInput(i));

  document.querySelector('#delete-ingredient-' + i).addEventListener('click', () => {
    ingredientsList.removeChild(
        document.querySelector('#add-ingredient-' + i),
    );
  });
});

const directionsList = document.querySelector('#directions ol');
const directionInput = (i) => {
  return `
        <li id="add-direction-${i}">
        <label for="direction-${i}">Työvaihe</label>
        <textarea name="recipeDirection" id="direction-${i}" class="directions"></textarea>
        <i class="fas fa-minus-circle" id="delete-direction-${i}" type="button"></i>
        </li>
        `;
};
const newDirectionButton = document.querySelector('#add-direction');

newDirectionButton.addEventListener('click', () => {
  let i = directionsList.children.length + 1;

  directionsList.insertAdjacentHTML('beforeend', directionInput(i));

  document.querySelector('#delete-direction-' + i).addEventListener('click', () => {
    directionsList.removeChild(
        document.querySelector('#add-direction-' + i),
    );
  });
});

(async () => {
  'use strict';
  const url = 'https://10.114.34.87/keittokirja/'; // change url when uploading to server

  // check sessionStorage
  // check if token valid
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    if (!response.ok) {
    } else {
      const json = await response.json();
      sessionStorage.setItem('user', JSON.stringify(json.user));
    }
  } catch (e) {
    console.log(e.message);
  }
})();