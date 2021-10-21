import './sass/main.scss';
import ApiImgService from './js/apiService.js';
import Notiflix from 'notiflix';
import imgTpl from './templates/imgTpl.hbs';
import refs from './js/refs.js';

const { form, loadMoreImgBtn, imgBox } = refs;
const apiImgService = new ApiImgService();

form.addEventListener('submit', onGetImg);
loadMoreImgBtn.addEventListener('click', onLoadIMg);

async function onGetImg(evt) {
  evt.preventDefault();
  imgBox.innerHTML = '';
  apiImgService.resetPage();
  apiImgService.query = evt.currentTarget.elements.query.value.trim();

  if (apiImgService.query === '') {
    return;
  }
  try {
    const result = await apiImgService.fetchImg();
    imgMarkup(result.hits);

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
  // form.resetPage();
}

async function onLoadIMg() {
  try {
    const result = await apiImgService.fetchImg();

    if (imgBox.querySelectorAll('.photo-card').length === result.totalHits) {
      console.log(result.totalHits);
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      imgMarkup(result.hits);
    }
  } catch (error) {}
}

function imgMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}
