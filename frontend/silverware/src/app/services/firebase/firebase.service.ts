import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageModel } from 'src/app/models/local-storage/localStorage.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService{
  constructor(public auth: AngularFireAuth, 
              private silverwareAuth: AuthService,
              private router: Router,
              private localStorageService : LocalStorageService,
              ) {
  }
  

  getAuthUser() {
      return this.silverwareAuth.getSignedInUser()
  }

  login(): Promise<any> {
      return this.googlelogin()
  }
  
  async googlelogin(): Promise<any> {
    return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(success => {
           this.firebaseGoogleAuth(success);
      })
      .catch(err => {
          console.error('Error in firebase authentication',err);
      });
  }

  public firebaseGoogleAuth(user: firebase.auth.UserCredential) {
    let useruid = user.user?.uid
    user.user?.getIdToken().then( firebaseToken => {
      if (user.additionalUserInfo?.isNewUser && useruid)
      {
        this.silverwareAuth.registerUserToSilverware(firebaseToken, useruid)
        .subscribe( () => {
            console.log('register user to silverware successful', user.user)
              this.silverwareAuth.loginUserToSilverware(firebaseToken)
              .subscribe({ 
                next: response => {
                  console.log('Login first time user to silverware successful', user)
                  this.localStorageService.setItem(LocalStorageModel.autheticationToken, response.svw_token)
                  if (useruid) {
                    this.localStorageService.setItem(LocalStorageModel.userId, useruid)
                  }
                  this.router.navigate(['/dashboard'])
                },
                error: error => {
                  console.error(error)
                }
              })
        })
      }
      else 
      {
        this.silverwareAuth.loginUserToSilverware(firebaseToken)
        .subscribe({ 
            next: response => {
              console.log('Login user to silverware successful', response)
              this.localStorageService.setItem(LocalStorageModel.autheticationToken, response.svw_token)
              this.localStorageService.setItem(LocalStorageModel.userId, response.user.svw_firebaseid)
              this.router.navigate(['/dashboard'])
            },
            error: error => {
              console.error('Login user to silverware',error)
            }
            });
        }
    }).catch( error => {
      console.error('login to silverware failed, invalid google user')
    });
  }

  logout() {
    this.auth.signOut().then(
      success => {
        this.clearAuthStates();
        console.log('Logout success', success);
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log('Error in logout');
    });
  }

  clearAuthStates() {
    this.localStorageService.removeItem(LocalStorageModel.autheticationToken);
    this.localStorageService.removeItem(LocalStorageModel.userId);
  }
}
