const user = JSON.parse(sessionStorage.getItem('user'));

let logged;

logged = !(!sessionStorage.getItem('token') || !sessionStorage.getItem('user'));
console.log(logged);

if (logged) {
  document.querySelector('#forms').setAttribute('style', 'display: none');
}

const recipeTemplate = (recipeId, recipeImage, recipeTitle, recipeSize,
                        recipeTime,
                        recipeCreator, recipeDate, recipeIngredients,
                        recipeDirections) => {
  return `<article class="recipe-${recipeId}">
            <header>
                <figure>
                    <img src="${recipeImage}" alt="${recipeTitle}">
                </figure>

                <div class="header-wrapper">
                    <div class="meta">
                        <h1>${recipeTitle}</h1>

                        <p>${recipeSize} annosta<br>
                            Valmistusaika: ${recipeTime} min</p>
                    </div>

                    <div class="user">
                        <p>
                            <a href="">${recipeCreator}</a><br>
                            ${recipeDate}
                        </p>
                    </div>
                </div>
            </header>

            <div class="content">
                <div class="ingredients">
                    <h2>Ainekset</h2>

                    <ul>
                        ${recipeIngredients}
                    </ul>
                </div>

                <div class="directions">
                    <h2>Valmistus</h2>

                    <ol>
                        ${recipeDirections}
                    </ol>
                </div>
            </div>
        </article`;
};

const recipe = (json) => {
  // const recipeImage = json.recipe_image;
  const recipeId = json.recipe_id;
  const recipeImage = './img_.jpg';
  const recipeTitle = json.title;
  const recipeSize = json.size;
  const recipeTime = json.time;
  const recipeCreator = json.name;
  const date = new Date(json.date);
  const recipeDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' +
      date.getFullYear();
  const ingredients = json.ingredients;
  let recipeIngredients = '';
  for (let i = 0; i < ingredients.length; i++) {
    recipeIngredients += '<li>' + ingredients[i] + '</li>';
  }
  const directions = json.directions;
  let recipeDirections = '';
  for (let i = 0; i < directions.length; i++) {
    recipeDirections += '<li>' + directions[i] + '</li>';
  }

  document.querySelector('div').
      insertAdjacentHTML('beforeend',
          recipeTemplate(recipeId, recipeImage, recipeTitle, recipeSize,
              recipeTime, recipeCreator, recipeDate, recipeIngredients,
              recipeDirections));

  const delButton = document.createElement('button');
  delButton.innerText = 'Poista';
  document.querySelector('article.recipe-' + recipeId).appendChild(delButton);

  delButton.addEventListener('click', async () => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    try {
      const response = await fetch(
          'http://localhost:3000/recipe/' + recipeId,
          fetchOptions,
      );
      const json = await response.json();
      console.log('delete response', json);
    } catch (e) {
      console.log(e.message);
    }
  });
};

const getRecipes = async (hash) => {
  document.querySelector('#recipes').innerText = '...';
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    console.log(sessionStorage.getItem('token'));
    const response = await fetch('http://localhost:3000/recipe/' + hash,
        fetchOptions);
    const recipes = await response.json();
    if (recipes.message === 'Database error') {
      document.querySelector('#recipes').innerText = 'Reseptiä ei löytynyt';
    } else if (hash !== '') {
      document.querySelector('#recipes').innerText = '';
      recipe(recipes);
    } else {
      document.querySelector('#recipes').innerText = '';
      for (let i = 0; i < recipes.length; i++) {
        recipe(recipes[i]);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

const regex = /(?<=#recipe-)[0-9]+$/g;
let hash = window.location.hash ? window.location.href.match(regex) : '';

getRecipes(hash);

const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', (e) => {
    let hash = links[i].href.match(regex);
    getRecipes(hash);
  });
}

(async () => {
  'use strict';
  const url = 'http://localhost:3000'; // change url when uploading to server

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