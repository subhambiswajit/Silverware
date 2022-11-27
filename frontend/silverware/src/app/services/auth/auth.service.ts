import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.dev";
import { catchError, Observable, of } from 'rxjs';
import { FirebaseToken} from '../../models/requests/firebasetoken';
import { SilverwareSigninResponse, User } from '../../models/responses/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageModel } from 'src/app/models/local-storage/localStorage.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  registerUserToSilverware(token: string, userid: string): Observable<any> {
    const requestObj: FirebaseToken = {
      "svw_firebaseid": token
    }
    return this.http.put<FirebaseToken>(environment.apiServer+environment.apiUrls.registerUser+userid, requestObj)
    .pipe(
      catchError(this.handleError('Register user to Silverware', requestObj))
    )
  }
  loginUserToSilverware(token: string): Observable<SilverwareSigninResponse> {
    const requestObj: FirebaseToken = {
      "svw_firebaseid": token
    }
    return this.http.post<FirebaseToken>(environment.apiServer+environment.apiUrls.loginUser, requestObj)
    .pipe(
      catchError(this.handleError('Login user to Silverware', requestObj))
    )
  }

  updateSilverwareUser(user: User, userId: string): Observable<any> {
    const requestObj: User = user; 
    return this.http.put<User>(environment.apiServer+environment.apiUrls.user.updateUser+userId, requestObj)
    .pipe(
      catchError(this.handleError('Update user details in Silverware', requestObj))
    )
    
  }
  getSignedInUser(): Observable<User> {
    let userid = this.localStorageService.getItem(LocalStorageModel.userId);
    return this.http.get<User>(environment.apiServer+environment.apiUrls.user.userbyid+userid);
  }

  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }

}
