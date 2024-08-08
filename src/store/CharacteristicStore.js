import { makeAutoObservable } from "mobx";

export default class CharacteristicStore {
  constructor() {
    this._characteristics = [];
    this._selectedCharacteristic = {};
    makeAutoObservable(this);
  }

  setCharacteristics(characteristics) {
    this._characteristics = characteristics
  }

  setSelectedCharacteristic(characteristic) {
    this._selectedCharacteristic = characteristic
  }

  get characteristics() {
    return this._characteristics;
  }

  get selectedCharacteristic() {
    return this._selectedCharacteristic
  }
}