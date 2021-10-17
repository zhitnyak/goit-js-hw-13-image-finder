// const axios = require('axios');
// const API_KEY = '22603097-01ea7c9e46d89c9af2e821f90';
// const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios';

// export default class ApiImgService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.perPage = 12;
//   }

//   async fetchImages() {
//     // const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
//     const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

//     const response = await axios.get(url);

//     this.page += 1;
//     return response.data;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
