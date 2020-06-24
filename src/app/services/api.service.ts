import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  base_path = 'http://bigcityapp.atwebpages.com/api';


  constructor(private http: HttpClient) { 

  }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(JSON.stringify(error.error.message));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      alert(
        `Backend returned code ${JSON.stringify(error.status)}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };





  register(newUserData):Observable<any>{
    return this.http.post(this.base_path+'/signup.php' ,newUserData).pipe(catchError(this.handleError));
  }

  login(loginData):Observable<any>{
    return this.http.post(this.base_path +'/login.php',loginData).pipe(catchError(this.handleError));
  }

  getPersonData(personData):Observable<any> {
    console.log(personData)
    return this.http.post(this.base_path +'/userProfile.php',personData);
  }

}
