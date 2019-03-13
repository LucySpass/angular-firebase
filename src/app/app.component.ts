import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dog park';
  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('dogs').valueChanges();
  }
}
