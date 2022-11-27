import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  requiredNamefield = new FormControl('', [Validators.required]);
  requiredDobfield = new FormControl('', [Validators.required]);
  requiredCityfield = new FormControl('', [Validators.required]);
  requiredProvincefield = new FormControl('', [Validators.required]);
  requiredPostalcodefield = new FormControl('', [Validators.required]);
  requiredBiofield = new FormControl('', [Validators.required]);
  requiredAddressfield = new FormControl('', [Validators.required]);
  requiredPhonefield = new FormControl('', [Validators.required, Validators.minLength(10)]);

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
    private localStorageService : LocalStorageService,
    private snackBar: MatSnackBar)
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
      if (!this.isAValidForm()){
        this.snackBar.open("Please provide details to all the fields", "close");
        return;
      }
      let userid = this.localStorageService.getItem(LocalStorageModel.userId) || "";
      this.auth.updateSilverwareUser(this.userDetails, userid).subscribe({
        next: response => {
          console.log(response)
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.firebase.logout()
          if (error.code === 404)
          { 
            this.snackBar.open("Session timed out ! Please login ", "close");
          }
          console.error(error)
        }
      })
    }
  
  getInvalidNameErrorMessage() {
    return this.requiredNamefield.hasError('required') ? 'Please provide your name' :
            '';
  }

  getInvalidDobErrorMessage() {
    return this.requiredDobfield.hasError('required') ? 'Please provide your date of birth' :
            '';
  }
  getInvalidCityErrorMessage() {
    return this.requiredCityfield.hasError('required') ? 'Please provide your city of residence' :
            '';
  }
  getInvalidProvinceErrorMessage() {
    return this.requiredProvincefield.hasError('required') ? 'Please provide the province' :
            '';
  }
  getInvalidPostalcodeErrorMessage() {
    return this.requiredPostalcodefield.hasError('required') ? 'Please provide the postal code' :
            '';
  }
  getInvalidBioErrorMessage() {
    return this.requiredBiofield.hasError('required') ? 'Please provide few words about you' :
            '';
  }
  getInvalidAddressErrorMessage() {
    return this.requiredAddressfield.hasError('required') ? 'Please provide an address' :
            '';
  }
  getInvalidPhoneErrorMessage() {
    if (this.requiredPhonefield.hasError('required')) {
      return  'Please provide a contact number';
    }
    return 'Please provide a valid contact number'
  }

  isAValidForm() {
    if (this.requiredNamefield.hasError('required') || 
        this.requiredAddressfield.hasError('required') ||
        this.requiredDobfield.hasError('required') || 
        this.requiredCityfield.hasError('required') ||
        this.requiredBiofield.hasError('required') || 
        this.requiredPostalcodefield.hasError('required') ||
        this.requiredProvincefield.hasError('required') ||
        this.requiredPhonefield.hasError('required')) {
          return false;
        }
    return true;
  }
}
