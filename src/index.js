import './sass/main.scss';
import axios from 'axios';
// import { fetchImg } from './js/apiService.js';
import Notiflix from 'notiflix';
import imgTpl from './templates/imgTpl.hbs';

const form = document.getElementById('search-form');
const loadMoreImgBtn = document.querySelector('.load-more');
const imgBox = document.querySelector('.gallery');

// const axios = require('axios');
const API_KEY = '22603097-01ea7c9e46d89c9af2e821f90';
const BASE_URL = 'https://pixabay.com/api/';

// export default
class ApiImgService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 12;
  }

  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    const response = await axios.get(url);

    this.page += 1;
    return response.data;
  }

  resetPage() {
    this.page = 1;
  }
}

const apiImgService = new ApiImgService();

form.addEventListener('submit', onGetImg);
// loadMoreImgBtn.addEventListener('click', onLoadImg);

async function onGetImg(evt) {
  evt.preventDefault();
  imgBox.innerHTML = '';
  apiImgService.resetPage();
  apiImgService.query = evt.currentTarget.elements.query.value.trim();

  if (apiImgService.query === '') {
    return;
  }

  try {
    const result = await apiImgService.fetchImages();

    console.dir(result);
    ImgMarkup(result.hits);

    if (result.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

// apiImgService.fetchImages(imgBox)
//  form.reset()

loadMoreImgBtn.addEventListener('click', onLoadIMg);

function onLoadIMg() {
  apiImgService.page = 1;
  apiImgService.fetchImages(imgBox);
}

function ImgMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}
