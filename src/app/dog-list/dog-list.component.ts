import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  courseRef: AngularFirestoreCollection<any>;
  courses$: Observable<any[]>;

  dogCount = 0;

  constructor(private db: AngularFirestore,
    private dogService: DogService) {
    this.$dogs = db.collection('dogs').valueChanges();

    this.$dogs.subscribe((dogs: DogModel[]) => {
      this.dogService.latestId = dogs.length === 0 ? 0 : Math.max.apply(Math, dogs.map((dog: DogModel) => dog.id));
      this.dogCount = dogs.length;
    });
  }

  ngOnInit() {
  }

  dogDeletion(dog: DogModel) {
    if (confirm('Are you sure that you want to delete ' + dog.nick + ' ?')) {
      this.db.collection('dogs').doc(dog.id.toString())
        .delete()
    }
  }

  dogEdit(dog: DogModel) {
    this.dogService.editDog(dog);
  }

}
