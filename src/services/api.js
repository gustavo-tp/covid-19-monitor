import axios from 'axios';

const api = axios.create({
  baseURL: 'https://corona.lmao.ninja/v2',
});

export default api;
