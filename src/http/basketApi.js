import { $host } from './';

export const addToBasket = async (productId) => {
  try {
    const response = await $host.post('api/basket/addProduct', productId);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const fetchBasket = async (userId) => {
  try {
    const response = await $host.get('api/basket');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const deleteFromBasket = async (productId) => {
  try {
    const response = await $host.post('api/basket/deleteProduct', productId);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};