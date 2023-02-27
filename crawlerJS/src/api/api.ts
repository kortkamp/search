import axios, { AxiosResponse } from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:3007';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE2Nzc0MTc0NTUsImV4cCI6MTY4MDAwOTQ1NSwic3ViIjoiMmE0NTU3N2MtMWY3MC00MjI0LWIyYmQtMDk2ZTYwNjg5NGI3In0.3zNqeeUUHrWl6-Xr3IkarDgtMiQnHp1pxo0-bXS_aDI; Expires=Mon, 27 Feb 2023 01:17:35 GMT; Max-Age=43200; Path=/; HttpOnly; Domain=localhost';

const defaultOptions = {
  baseURL,
  withCredentials: true,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    Cookie: `access_token=${accessToken}`,
  },
};

const instance = axios.create(defaultOptions);

const api = () => {
  instance.interceptors.response.use(function (config) {
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
