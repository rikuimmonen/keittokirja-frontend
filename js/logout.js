'use strict';
const url = 'https://10.114.34.87/keittokirja';

sessionStorage.removeItem('token');
sessionStorage.removeItem('user');
alert('You have logged out');
location.href = 'index.html';