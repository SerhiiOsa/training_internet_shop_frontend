import { $host } from './';

export const createType = async (type) => {
  try {
    const response = await $host.post('api/type', type);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
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

export const createBrand = async (brand) => {
  try {
    const response = await $host.post('api/brand', brand);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
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

export const createProduct = async (product) => {
  try {
    const response = await $host.post('api/product', product);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
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

export const fetchCharacteristics = async () => {
  try {
    const response = await $host.get('api/characteristic');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const  updateProduct = async (id, product) => {
  try {
    const response = await $host.put('api/product/' + id, product);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const  deleteProduct = async (id) => {
  try {
    const response = await $host.delete('api/product/' + id);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};

export const createRate = async (rate) => {
  try {
    const response = await $host.post('api/rating', rate);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'An unknown error occurred');
    } else {
      throw new Error(error.message);
    }
  }
};