import { makeAutoObservable } from "mobx";

export default class TypeStore {
  constructor() {
    this._types = [{id: Date.now(), name: 'Всі', nameInPlural: 'Всі'}];
    this._selectedType = this._types[0]; //changable in different components
    this._selectedTypeHistory = this._types[0]; //changable only by clicking on TypeBar
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = [this._types[0], ...types];
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedTypeHistory(type) {
    this._selectedTypeHistory = type;
  }

  get types() {
    return this._types;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedTypeHistory() {
    return this._selectedTypeHistory;
  }
}