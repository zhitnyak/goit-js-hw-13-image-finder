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
      Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);

      // делаем скролл вниз не мгновенно, с задержкой
      setTimeout(
        () =>
          window.scrollTo({
            // прокрутку делаем на всю высоту html вниз
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          }),
        500,
      );
    })
    .catch(error => console.log(error));
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

form.addEventListener('submit', getImg);
console.log(form);

function getImg(e) {
  e.preventDefault();
  imgBox.innerHTML = '';
  // resetPage()
  const query = e.currentTarget.elements.query.value.trim();
  fetchImg(query);
  form.reset();
}

loadMoreImgBtn.addEventListener('click', () => {
  // page = 1;
  fetchImg(imgBox);
});

// window.addEventListener('scroll', function () {
//   //let block = document.getElementById('infinite-scroll');
//   let counter = 1;
//   // page = 1;
//   fetchImg(imgBox);
//   let contentHeight = imgBox.offsetHeight; // 1) высота блока контента вместе с границами
//   let yOffset = window.pageYOffset; // 2) текущее положение скролбара
//   let window_height = window.innerHeight; // 3) высота внутренней области окна документа
//   let y = yOffset + window_height;

//   // если пользователь достиг конца
//   if (y >= contentHeight) {
//     //загружаем новое содержимое в элемент
//     imgBox.innerHTML = imgBox.innerHTML + fetchImg(perPage);
//   }
// });

function createMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}
