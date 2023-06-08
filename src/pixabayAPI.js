import axios from 'axios';

export class RequestServer {
  static url = 'https://pixabay.com/api/';
  static key = '14167175-fc0e53a7a7b8f01fb7f615bad';
  searchImg(value, page) {
    return axios.get(
      `${RequestServer.url}?q=${value}&page=${page}&key=${RequestServer.key}&image_type=photo&orientation=horizontal&per_page=12`
    );
  }
}
