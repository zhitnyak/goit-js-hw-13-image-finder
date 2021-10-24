import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onImgClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  const largeModalImg = `<img src=${evt.target.dataset.source} alt="icon" />`;
  console.dir(evt.target);
  basicLightbox.create(largeModalImg).show();
}
