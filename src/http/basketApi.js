import { LOGIN_ROUTE, RETRY_LIMIT } from '../utils/consts';
import { $host } from './';

export const addToBasket = async (productId, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/basket/addProduct', productId);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await addToBasket(productId, retryAttempt + 1);
      } else {
        if (error.response.status === 401) {
          window.location.href = LOGIN_ROUTE;
          return;
        }
        throw new Error(error.response.data.error || 'An unknown error occurred');
      }
    } else {
      throw new Error(error.message);
    }
  }
};

export const updateQuantity = async (product, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/basket/editQuantity', product);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await updateQuantity(product, retryAttempt + 1);
      } else {
        if (error.response.status === 401) {
          window.location.href = LOGIN_ROUTE;
          return;
        }
        throw new Error(error.response.data.error || 'An unknown error occurred');
      }
    } else {
      throw new Error(error.message);
    }
  }
};

export const fetchBasket = async (userId, retryAttempt = 0) => {
  try {
    const response = await $host.get('api/basket');
    if(response.data.message === "Access token was successfully refreshed. Please retry your request with the new token.") {
      return await fetchBasket(userId);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await fetchBasket(userId, retryAttempt + 1);
      } else {
        if (error.response.status === 401) {
          window.location.href = LOGIN_ROUTE;
          return;
        }
        throw new Error(error.response.data.error || 'An unknown error occurred');
      }
    } else {
      throw new Error(error.message);
    }
  }
};

export const deleteFromBasket = async (productId, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/basket/deleteProduct', productId);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await deleteFromBasket(productId, retryAttempt + 1);
      } else {
        if (error.response.status === 401) {
          window.location.href = LOGIN_ROUTE;
          return;
        }
        throw new Error(error.response.data.error || 'An unknown error occurred');
      }
    } else {
      throw new Error(error.message);
    }
  }
};