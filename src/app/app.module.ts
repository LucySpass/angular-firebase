import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DogEditComponent } from './dog-edit/dog-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DogListComponent } from './dog-list/dog-list.component';
import { DogService } from './dog.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: DogListComponent },
  { path: 'dog/:id', component: DogEditComponent },
  { path: 'add', component: DogEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DogEditComponent,
    DogListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DogService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
