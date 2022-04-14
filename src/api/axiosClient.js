import axios from "axios";

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('error response', error.response);
    // return Promise.reject(error);

    if (error.response.status === 401) {
      throw error.response.data.message;
    }
    throw error.response;
  }
);
export default axiosClient;
