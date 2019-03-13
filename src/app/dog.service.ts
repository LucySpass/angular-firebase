import { EventEmitter, Injectable } from '@angular/core';
import { DogModel } from './dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  dog: DogModel;
  newDog: DogModel = {
    id: -1,
    nick: '',
    age: 0,
    breed: ''
  };

  constructor() {
    this.dog = this.newDog;
  }

  addNewDog() {
    this.dog = this.newDog;
  }

  editDog(editDog: DogModel) {
    this.dog = editDog;
  }

}
