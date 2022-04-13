import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn',
  headers: {
    'Content-Type': 'application/json',
    Token: '8b9199a7-4c2f-11ec-ac64-422c37c6de1b',
    'Access-Control-Allow-Origin': '*',
    ShopId: 83685,
  },

  // baseURL:'https://api.ezfrontend.com',
  // baseURL: 'https://task-management-vhm.herokuapp.com',
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const token = localStorage.getItem('access-token');
    // console.log('token', token);
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers.common.Token = '12d0B0c45a64E00a67968B37d1Bf02b41Cc43dF7';
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    config.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('error response', error.response);
    // return Promise.reject(error);
    console.log('ẻ', error.response);
    if (error.response.status === 401) {
      throw error.response.data.message;
    }
    throw error.response;
  }
);
export default axiosClient;
