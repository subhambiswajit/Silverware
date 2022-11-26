import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from "../environments/environment.dev";
import { AuthService } from './services/auth/auth.service'; 
import { FirebaseService } from './services/firebase/firebase.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  providers: [
    AuthService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
