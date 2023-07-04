import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
   //handle the req
   request = this.addAuthHeader(request);

   //call next() and handle the response
   return next.handle(request).pipe(
    catchError((error:HttpErrorResponse) => {
      console.log(error)
      return throwError(error);
    })
    ) 
   
  }

  addAuthHeader(request:HttpRequest<any>){
    //get the access token
    const token = this.authService.getAccessToken(); 
    if(token){
      //append the access token to the header
      return request.clone({
        setHeaders:{
          'x-access-token': token
        }
      })
    }
    return request;
  }

}
