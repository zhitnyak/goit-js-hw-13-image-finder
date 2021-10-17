import './sass/main.scss';
import axios from 'axios';
// import { fetchImg } from './js/apiService.js';
import Notiflix from 'notiflix';
import imgTpl from './templates/imgTpl.hbs';

// Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);

// Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

// Notiflix.Notify.success('Click Me', {
//   timeout: 500,
// });
// Notiflix.Notify.warning('Click Me', {
//   timeout: 500,
// });
const form = document.getElementById('search-form');
const loadMoreImgBtn = document.querySelector('.load-more');
const imgBox = document.querySelector('.gallery');

function fetchImg(query, page = 1, perPage = 12) {
  const API_KEY = '22603097-01ea7c9e46d89c9af2e821f90';
  const BASE_URL = 'https://pixabay.com/api/';
  let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_KEY}`;

  axios
    .get(url)
    .then(res => res.data.hits)
    .then(d => {
      console.log(d);
      createMarkup(d);
    })
    .catch(error => console.log(error));
}

form.addEventListener('submit', getImg);
console.log(form);

function getImg(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value.trim();
  fetchImg(query);
  // .then(createMarkup)
  // .catch(error => console.log(error));
  form.reset();
}

function createMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}
