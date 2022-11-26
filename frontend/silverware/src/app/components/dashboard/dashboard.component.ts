import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetails, User } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  userDetails: User= {
    svw_firebaseid: "", 
    svw_email: "", 
    svw_name: "", 
    svw_photoUrl: ""
  };
  constructor(private auth: AuthService, private firebase: FirebaseService)
  {

      this.auth.getSignedInUser().subscribe(
        { 
          next: response => {
            console.log('Login first time user to silverware successful', response);
            this.userDetails = response
          },
          error: error => {
            this.firebase.logout()
            console.error(error)
          }
        })
  }

  public logout() {
    this.firebase.logout();
  }
 
}
