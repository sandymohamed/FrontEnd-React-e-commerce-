import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    // set any default headers here
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;
