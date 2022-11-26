import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.dev";
import { catchError, Observable, of } from 'rxjs';
import { FirebaseToken} from '../../models/requests/firebasetoken';
import { SilverwareSigninResponse } from '../../models/responses/user';
import { UserDetails } from 'src/app/models/responses/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUserToSilverware(token: string, userid: string): Observable<any> {
    const requestObj: FirebaseToken = {
      "svw_firebaseid": token
    }
    return this.http.put<FirebaseToken>(environment.apiServer+environment.apiUrls.registerUser+userid, requestObj)
    .pipe(
      catchError(this.handleError('Register user to parker', requestObj))
    )
  }
  loginUserToSilverware(token: string): Observable<SilverwareSigninResponse> {
    const requestObj: FirebaseToken = {
      "svw_firebaseid": token
    }
    return this.http.post<FirebaseToken>(environment.apiServer+environment.apiUrls.loginUser, requestObj)
    .pipe(
      catchError(this.handleError('Login user to parker', requestObj))
    )
  }

  getSignedInUser(): Observable<UserDetails> {
    return this.http.get<UserDetails>(environment.apiServer+environment.apiUrls.user.userDetails);
  }

  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }

}
