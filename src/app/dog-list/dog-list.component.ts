import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-dog-list',
    templateUrl: './dog-list.component.html',
    styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {
    items: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        this.items = db.collection('dogs').valueChanges();
    }

    ngOnInit() {
    }

}
