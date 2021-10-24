import './sass/main.scss';
import ApiImgService from './js/apiService.js';
import Notiflix from 'notiflix';
import imgTpl from './templates/imgTpl.hbs';
import onImgClick from './js/largeImg.js';
import refs from './js/refs.js';
import { foo } from './js/backToTop.js';

foo();

const { form, loadMoreImgBtn, imgBox } = refs;
const apiImgService = new ApiImgService();
// const imgCardModal = document.querySelector('.lightbox__image');

form.addEventListener('submit', onGetImg);
loadMoreImgBtn.addEventListener('click', onLoadIMg);
imgBox.addEventListener('click', onImgClick);

async function onGetImg(evt) {
  evt.preventDefault();
  imgBox.innerHTML = '';
  loadMoreImgBtn.classList.add('hidden');
  apiImgService.resetPage();
  apiImgService.query = evt.currentTarget.elements.query.value.trim();

  if (apiImgService.query === '') {
    return;
  }
  try {
    const result = await apiImgService.fetchImg();
    console.log(result);
    imgMarkup(result.hits);

    if (result.hits.length === 0) {
      loadMoreImgBtn.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    loadMoreImgBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning('Error!!!');
  }
}

async function onLoadIMg() {
  try {
    const result = await apiImgService.fetchImg();

    if (imgBox.querySelectorAll('.photo-card').length === result.totalHits) {
      loadMoreImgBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      imgMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning('Error!!!');
  }
}

function imgMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}

// function onImgClick(evt) {}
