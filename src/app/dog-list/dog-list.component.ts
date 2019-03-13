import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DogService } from '../dog.service';
import { DogModel } from '../dog.model';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {
  dogs: Observable<any[]>;
  dogDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore,
    private dogService: DogService) {
    this.dogs = db.collection('dogs').valueChanges();

    db.collection('dogs').valueChanges().subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit() {
  }

  dogDeletion(dog: DogModel) {
    if (confirm('Are you sure that you want to delete ' + dog.nick + ' ?')) {
      this.dogDoc = this.db.doc(`dogs/${dog.nick + dog.age}`);
      this.dogDoc.delete()
        .then((error) => console.log(error));
    }
  }

  dogEdit(dog: DogModel) {
    console.log(dog);
    this.dogService.editDog(dog);
  }

}
