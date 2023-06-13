import axios from 'axios';

const Token = localStorage.getItem('token')
const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    // set any default headers here
    'Content-Type': 'application/json',
    'authorization': `Bearer ${Token}`
  },
});

export default AxiosInstance;
