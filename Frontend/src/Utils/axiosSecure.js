/* eslint-disable no-unused-vars */
import axios from "axios";


// const prod = "https://bistro-boss-fytb.onrender.com/api/v1/"
const prod = "https://e-commerce-henna-beta-50.vercel.app/api/v1/"

const local = 'http://localhost:5000/api/v1/'

// Create an Axios instance
const axiosSecure = axios.create({
  baseURL: local,
});

// Add a request interceptor to include the token and Content-Type headers
axiosSecure.interceptors.request.use(
  (config) => {
    // Retrieve the token from storage (e.g., localStorage or a variable)
    const token = localStorage.getItem('userToken');
    const { accessToken } = JSON.parse(token);
    if (accessToken) {
      // If a token exists, set it in the Authorization header
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Set Content-Type header for multipart form data
    // config.headers['Content-Type'] = 'multipart/form-data';

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosSecure;