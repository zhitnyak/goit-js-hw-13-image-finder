import './sass/main.scss';
import ApiImgService from './js/apiService.js';
import Notiflix from 'notiflix';
import imgTpl from './templates/imgTpl.hbs';
import onImgClick from './js/largeImg.js';
import refs from './js/refs.js';
import { backToTopBtn } from './js/backToTop.js';
import { Spinner } from 'spin.js';

const { form, loadMoreImgBtn, imgBox, target, lineTargetEl } = refs;
const apiImgService = new ApiImgService();

//for spinner_______________
var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#4b5fb6;', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

backToTopBtn();

form.addEventListener('submit', onGetImg);
// loadMoreImgBtn.addEventListener('click', onLoadIMg);
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
    const spinner = new Spinner({ color: '#4b5fb6', lines: 12 }).spin(target);
    const result = await apiImgService.fetchImg();
    spinner.stop(target);
    imgMarkup(result.hits);

    if (result.hits.length === 0) {
      // loadMoreImgBtn.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    // loadMoreImgBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning('Error! Failed to fetch!');
  }
}

// async function onLoadIMg() {
//   try {
//     const result = await apiImgService.fetchImg();

//     if (imgBox.querySelectorAll('.photo-card').length === result.totalHits) {
//       loadMoreImgBtn.classList.add('hidden');
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     } else {
//       imgMarkup(result.hits);
//     }
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.warning('Error!!!');
//   }
// }

function imgMarkup(data) {
  imgBox.insertAdjacentHTML('beforeend', imgTpl(data));
}

const observer = new IntersectionObserver(intersectionObserver, {
  // threshold: 1,
  rootMargin: '10%',
});
observer.observe(lineTargetEl);

async function intersectionObserver(entries) {
  try {
    await entries.forEach(entry => {
      if (entry.isIntersecting && apiImgService.query !== '') {
        apiImgService.fetchImg().then(data => {
          // console.log(data.hits);
          imgMarkup(data.hits);
          if (data.hits.length < 12) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning('Error!!!');
  }
}
