import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DogModel } from '../dog.model';
import { DogService } from '../dog.service';
import { ActivatedRoute } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize';

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
      M.updateTextFields();
    } else {
      this.dogService.addNewDog();
      this.dog = { ...this.dogService.dog };
      this.isEdit = false;
      this.isShown = true;
    }
  }

  getSpecificDog(docId: string) {
    const docRef = this.db.collection('dogs').doc(docId);
    this.subscription = docRef.valueChanges().subscribe((item: DogModel) => {
      this.dog = { ...item };
      this.isShown = true;
    });
  }

  ngOnChanges() {
  }

  dogChange() {
    if (!this.isEdit) {
      this.dog =
        {
          ...this.dog,
          id: ++this.dogService.latestId
        };
    }
    this.db.collection('dogs').doc(this.dog.id.toString()).set(this.dog)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
