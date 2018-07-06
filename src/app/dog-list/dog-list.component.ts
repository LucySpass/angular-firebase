import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-dog-list',
    templateUrl: './dog-list.component.html',
    styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {
    dogs: Observable<any[]>;
    dogDoc: AngularFirestoreDocument<any>;

    constructor(private db: AngularFirestore) {
        this.dogs = db.collection('dogs').valueChanges();
    }

    ngOnInit() {
    }

    dogDeletion(dog) {
        if (confirm('Are you sure that you want to delete ' + dog.nick + ' ?')) {
            this.dogDoc = this.db.doc(`dogs/${dog.nick + dog.age}`);
            this.dogDoc.delete()
                .then((error) => console.log(error));
        }
    }

    dogEdit() {
    }

}
