import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import BrandStore from './store/BrandStore';
import TypeStore from './store/TypeStore';
import CharacteristicStore from './store/CharacteristicStore'
import TypeBrandStore from './store/TypeBrandStore';
import UpdatingProductStore from './store/UpdatingProductStore';
import BasketStore from './store/BasketStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value ={{
    user: new UserStore(),
    product: new ProductStore(),
    brand: new BrandStore(),
    type: new TypeStore(),
    typeBrand: new TypeBrandStore(),
    characteristic: new CharacteristicStore(),
    updatingProduct: new UpdatingProductStore(),
    basket: new BasketStore()
  }}>
  <App />
  </Context.Provider>
);
