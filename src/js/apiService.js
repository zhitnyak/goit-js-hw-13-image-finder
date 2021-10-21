import axios from 'axios';
const API_KEY = '22603097-01ea7c9e46d89c9af2e821f90';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiImgService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 12;
  }

  async fetchImg() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
    const response = await axios.get(url);
    this.page += 1;
    return response.data;
  }
  resetPage() {
    this.page = 1;
  }
}
