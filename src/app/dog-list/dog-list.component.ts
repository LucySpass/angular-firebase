import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DogService } from '../dog.service';
import { DogModel } from '../dog.model';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {
  $dogs: Observable<any[]>;

  constructor(private db: AngularFirestore,
    private dogService: DogService) {
    this.$dogs = db.collection('dogs').valueChanges();

    db.collection('dogs').valueChanges().subscribe((dogs: DogModel[]) => {
      console.log(dogs);
      this.dogService.latestId = Math.max.apply(Math, dogs.map((dog: DogModel) => dog.id));
      console.log(this.dogService.latestId);
    });
  }

  ngOnInit() {
  }

  dogDeletion(dog: DogModel) {
    if (confirm('Are you sure that you want to delete ' + dog.nick + ' ?')) {
      this.db.collection('dogs').doc(dog.id.toString())
        .delete()
        .then((error) => console.log('Error while deleting an item: ', error));
    }
  }

  dogEdit(dog: DogModel) {
    console.log(dog);
    this.dogService.editDog(dog);
  }

}
