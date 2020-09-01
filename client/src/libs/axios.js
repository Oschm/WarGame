// wrapper for axios with jwt handling
import router from '../router';

const axios = require('axios').default;

class AxiosService {
  constructor() {
    // variable which will later hold the jwt
    this.JWT = null;

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;
    axios.defaults.crossDomain = true;
    const baseUrl = process.env.VUE_APP_BACKEND_URL;
    const service = axios.create({
      baseURL: baseUrl,
      proxy: false,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // service.defaults.baseURL = 'www.google.de'; // process.env.VUE_APP_BACKEND_URL;
    // before request

    service.interceptors.request.use((config) => {
      const token = this.JWT;

      if (token != null) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }

      return config;
    }, () => {
      // TODO error handling
      console.log('Error during req interception');
    });
    // after request
    service.interceptors.response.use(this.handleSuccess.bind(this), this.handleError.bind(this));
    this.service = service;
  }

  handleSuccess(response) {
    // check how to set jwt
    if (response.data && response.data.token) {
      this.JWT = response.data.token;
    }
    console.log(`Call Successfull, response: ${JSON.stringify(response)}`);
    return response;
  }

  handleError = (error) => {
    if (error && error.message && error.message === 'Network Error') {
      return Promise.reject(error.message);
    }
    switch (error.response.status) {
      case 401:
        router.push('/');
        break;
      case 404:
        // TODO implement 404
        router.push('404');
        break;
      default:
        router.push('/');
        break;
    }
    return Promise.reject(error.response.data);
  }

  post = function (url, body, successHandler, errorHandler) {
    this.service.post(url, body).then(successHandler).catch(errorHandler);
  }

  get = function (url, successHandler, errorHandler) {
    // this.service.get(url).then(successHandler).catch(errorHandler);
    this.service({
      method: 'get',
      url: url,
    }).then(successHandler).catch(errorHandler);
  }
}
export default new AxiosService();
