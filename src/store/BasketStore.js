import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._products = [];
    makeAutoObservable(this);
  }

  setProducts(products) {
    this._products = products;
  }

  addProduct(product) {
    this._products = [...this._products, product];
  }

  removeProduct(productId) {
    const productIndex = this._products.findIndex(p => p.id === productId);
    if(productId !== -1) {
      this._products.splice(productIndex, 1);
    }
  }

  get products() {
    return this._products;
  }
}