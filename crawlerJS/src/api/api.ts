import axios, { CreateAxiosDefaults } from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:3007';

let accessToken = '';

const defaultOptions: CreateAxiosDefaults<any> = {
  baseURL,
  withCredentials: true,
  timeout: 10000,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
};

const instance = axios.create(defaultOptions);

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const api = () => {
  instance.interceptors.response.use(function (config) {
    return config;
  });

  instance.interceptors.request.use(config => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });

  // instance.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response.status === 401) {
  //       window.location.href = '/logout';
  //     }
  //   },
  // );

  return instance;
};
// export { accessToken };
export default api();
