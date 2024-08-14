import { LOGIN_ROUTE, RETRY_LIMIT } from '../utils/consts';
import { $host } from './';

export const createType = async (type, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/type', type);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await createType(type, retryAttempt + 1);
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

export const fetchTypes = async () => {
  try {
    const response = await $host.get('api/type');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const createBrand = async (brand, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/brand', brand);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await createBrand(brand, retryAttempt + 1);
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

export const fetchBrands = async () => {
  try {
    const response = await $host.get('api/brand');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const createProduct = async (product, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/product', product);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await createProduct(product, retryAttempt + 1);
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

export const fetchProducts = async (typeId = '', brandId = '', page = 1, limit = 100) => {
  try {
    const response = await $host.get('api/product', {params: {typeId, brandId, page, limit}});
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const fetchOneProduct = async (id) => {
  try {
    const response = await $host.get('api/product/' + id);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const fetchCharacteristics = async (retryAttempt = 0) => {
  try {
    const response = await $host.get('api/characteristic');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await fetchCharacteristics(retryAttempt + 1);
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


export const  updateProduct = async (id, product, retryAttempt = 0) => {
  try {
    const response = await $host.put('api/product/' + id, product);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await updateProduct(id, product, retryAttempt + 1);
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

export const  deleteProduct = async (id, retryAttempt = 0) => {
  try {
    const response = await $host.delete('api/product/' + id);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await deleteProduct(id, retryAttempt + 1);
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

export const createRate = async (rate, retryAttempt = 0) => {
  try {
    const response = await $host.post('api/rating', rate);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 && retryAttempt < RETRY_LIMIT) {
        return await createRate(rate, retryAttempt + 1);
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