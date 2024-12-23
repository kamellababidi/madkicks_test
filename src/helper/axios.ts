import axios from 'axios';

const axiosParams = {
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 50000,
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers !== undefined) {
      config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWM5YzE1NWM4NDlkMjQ4MzQ3NDM5ZWMxZDhhN2JkNiIsIm5iZiI6MTYwMTY1MjgwMC43NTksInN1YiI6IjVmNzc0ODQwNTMyYWNiMDAzNzc3ZTRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em4lmbZueITI2BXoa_sb-WqKxgMpQJXwQNa0R68_AhI';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status !== 200) {
      // show error
      console.log(' error.response.status -- >', error.response.status);
    }
    return Promise.reject(error);
  },
);

const { get, post, put, delete: destroy, patch } = axiosInstance;
export { get, post, put, destroy, patch };
export default axiosInstance;
