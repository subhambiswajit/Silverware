import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { LocalStorageModel } from 'src/app/models/local-storage/localStorage.model';
import { environment } from 'src/environments/environment.dev';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) { 
    this.localStorageService = localStorageService
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.localStorageService.getItem(LocalStorageModel.autheticationToken);
    const isSvwUrl = request.url.startsWith(environment.apiServer);
    if (jwtToken && isSvwUrl) {
        request = request.clone({
            setHeaders: { Authorization: "Bearer "+ jwtToken }
        });
    }
    request = request.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });
    return next.handle(request).pipe(
            finalize(() => console.log("Http request completed"))
        );
  }
}
