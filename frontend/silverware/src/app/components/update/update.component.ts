import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocalStorageModel } from 'src/app/models/local-storage/localStorage.model';

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
  constructor(private auth: AuthService, 
    private firebase: FirebaseService,
    private router: Router, 
    private localStorageService : LocalStorageService)
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
  
  userProfileUpdate() {
      let userid = this.localStorageService.getItem(LocalStorageModel.userId) || "";
      this.auth.updateSilverwareUser(this.userDetails, userid).subscribe({
        next: response => {
          console.log(response)
        },
        error: error => {
          this.firebase.logout()
          console.error(error)
        }
      })
    }
}
