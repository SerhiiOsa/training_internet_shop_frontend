import { makeAutoObservable } from "mobx";

export default class UpdatingProductStore {
  constructor() {
    this._count = 0;
    makeAutoObservable(this);
  }

  updateCount() {
    this._count ++;
  }

  get count() {
    return this._count;
  }
}