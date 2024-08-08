import { $host } from './';
import { jwtDecode } from 'jwt-decode';

export const registration = async (email, password) => {
  try {
    const response = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
    return jwtDecode(response.headers['authorization']);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await $host.post('api/user/login', { email, password });
    return jwtDecode(response.headers['authorization']);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const check = async () => {
  const response = await $host.get('api/user/auth');
  return jwtDecode(response.headers['authorization']);
};

export const logout = async () => {
  try {
    await $host.post('api/user/logout');
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};
