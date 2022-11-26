import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    svw_photoUrl: "",
    svw_address: "",
    svw_bio: "",
    svw_dob: "",
    svw_telephone: "", 
    svw_city: "", 
    svw_province: "", 
    svw_postalcode: ""
  };
  constructor(private auth: AuthService, 
    private firebase: FirebaseService,
    private router: Router)
  {
      this.auth.getSignedInUser().subscribe(
        { 
          next: response => {
            this.userDetails = response
          },
          error: error => {
            this.firebase.logout()
            console.error(error)
          }
        })
  }

  public userUpdate() {
    this.router.navigate(['/update'])
  }
 
}
