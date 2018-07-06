import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
    selector: 'app-dog-edit',
    templateUrl: './dog-edit.component.html',
    styleUrls: ['./dog-edit.component.css']
})
export class DogEditComponent implements OnInit {
    age: number;
    nick: string;
    breed: string;

    constructor(private db: AngularFirestore) {
    }

    ngOnInit() {
    }

    Addition() {
        this.db.collection('dogs').doc(this.nick + this.age).set({
            age: this.age,
            breed: this.breed,
            nick: this.nick
        }).catch(function (error) {
            console.error('Error adding document: ', error);
        });
    }
}
