import { makeAutoObservable } from "mobx";

export default class BrandStore {
  constructor() {
    this._brands = [{id: Date.now(), name: 'Всі'}];
    this._selectedBrand = this._brands[0];
    this._selectedBrandHistory = this._brands[0];
    makeAutoObservable(this);
  }

  setBrands(brands) {
    this._brands = [this._brands[0], ...brands]
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }

  setSelectedBrandHistory(brand) {
    this._selectedBrandHistory = brand
  }

  get brands() {
    return this._brands;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedBrandHistory() {
    return this._selectedBrandHistory;
  }
}