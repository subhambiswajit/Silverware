import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
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
  validations = {
    presentDate: new Date(),
  }
  public provinces = [
    { name: "Select", value: ""},
    { name: "Newfoundland and Labrador", value: "NL"},
    { name: "Prince Edward Island", value: "PE"},
    { name: "Nova Scotia", value: "NS"},
    { name: "New Brunswick", value: "NB"},
    { name: "Quebec", value: "QC"},
    { name: "Ontario", value: "ON"},
    { name: "Manitoba", value: "MB"},
    { name: "Saskatchewan", value: "SK"},
    { name: "Alberta", value: "AB"},
    { name: "British Columbia", value: "BC"},
    { name: "Yukon", value: "YT"},
    { name: "Northwest Territories", value: "NT"},
    { name: "Nunavut", value: "NU"},
  ]
  email = new FormControl(this.userDetails.svw_email, [Validators.required, Validators.email]);
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
          }
        )
    }
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
    }
}
