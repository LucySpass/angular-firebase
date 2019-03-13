import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DogModel } from '../dog.model';
import { DogService } from '../dog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dog-edit',
  templateUrl: './dog-edit.component.html',
  styleUrls: ['./dog-edit.component.css']
})
export class DogEditComponent implements OnInit, OnChanges, OnDestroy {
  dog: DogModel;
  isEdit: boolean;
  isShown: boolean = false;
  subscription: any;

  constructor(private db: AngularFirestore,
    private route: ActivatedRoute,
    private dogService: DogService) {
  }

  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    if (docId !== null) {
      this.getSpecificDog(docId);
    } else {
      this.dogService.addNewDog();
      this.dog = this.dogService.dog;
      this.isEdit = false;
      this.isShown = true;
    }
  }

  getSpecificDog(docId: string) {
    const docRef = this.db.collection('dogs').doc(docId);
    this.subscription = docRef.valueChanges().subscribe((item: DogModel) => {
      this.dog = item;
      this.isShown = true;
    });
  }

  ngOnChanges() {
  }

  Addition() {
    if (!this.isEdit) {
      this.db.collection('dogs').doc(this.dog.nick + this.dog.age).set({
        age: this.dog.age,
        breed: this.dog.breed,
        nick: this.dog.nick
      }).catch(function (error) {
        console.error('Error adding document: ', error);
      });
    } else {
      this.db.collection('dogs').doc(this.dog.nick + this.dog.age).update({
        age: this.dog.age,
        breed: this.dog.breed,
        nick: this.dog.nick
      }).catch(function (error) {
        console.error('Error editing document: ', error);
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
