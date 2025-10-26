import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(response => {
  response.data = camelcaseKeys(response.data, { deep: true });
  return response;
});

instance.interceptors.request.use(config => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }
  return config;
});
