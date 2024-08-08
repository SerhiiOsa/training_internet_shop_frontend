import { makeAutoObservable } from "mobx";

export default class TypeBrandStore {
  constructor() {
    this._typeBrands = [];
    this._selectedTypeBrands = [];
    makeAutoObservable(this);
  }

  setTypeBrands(typeBrands) {
    this._typeBrands = typeBrands;
  }

  setSelectedTypeBrands(selectedTypeBrands) {
    this._selectedTypeBrands = selectedTypeBrands;
  }

  get typeBrands() {
    return this._typeBrands;
  }

  get selectedTypeBrands() {
    return this._selectedTypeBrands;
  }
}