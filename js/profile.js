'use strict';
const url = 'https://10.114.34.87/keittokirja';

const profiili = document.querySelector('#profiili');
const reseptilista = document.querySelector('#reseptilista')

let logged;

logged = !(!sessionStorage.getItem('token') || !sessionStorage.getItem('user'));
console.log(logged);
console.log(sessionStorage.getItem('token'));
console.log(sessionStorage.getItem('user'));

const loggedUser = JSON.parse(sessionStorage.getItem('user'));
console.log(loggedUser);

if (logged === false) {
  console.log('lol');
  location.href = 'login.html';
}

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

    let id = recipe.recipe_id;
    console.log(id);

    const h4 = document.createElement('h4');
    const a = document.createElement('a');
    a.innerHTML = recipe.title;
    a.setAttribute('href', 'single_recipe.html?id=' + id);
/*
    // open image in single.html
    h4.addEventListener('click', () => {
      location.href = 'single_recipe.html?id=' + id;
    });*/

    h4.appendChild(a);

    const li = document.createElement('li');
    li.appendChild(h4);

    reseptilista.appendChild(h4);
  });
};

const getUser = async () => {
  try {
    const response = await fetch(url + '/user/' + loggedUser.id + '/');
    const user = await response.json();
    //console.log(user);
    createProfile(user);
  } catch (e) {
    console.log(e.message);
  }
};

const getRecipes = async () => {
  try {
    const response = await fetch(url + '/user/' + loggedUser.id + '/recipe');
    const recipes = await response.json();
    //console.log(recipes);
    createRecipes(recipes);
  } catch (e) {
    console.log(e.message);
  }
};


//logged-check
(async () => {
  'use strict';
  const url = 'https://10.114.34.87/keittokirja';

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

getUser();
getRecipes();