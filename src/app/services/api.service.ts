import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

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

  register(newUserData):Observable<any>{
    return this.http.post(this.base_path+'/signup.php' ,newUserData);
  }

  login(loginData):Observable<any>{
    return this.http.post(this.base_path +'/login.php',loginData);
  }

  getPersonData(personData):Observable<any> {
    console.log(personData)
    return this.http.post(this.base_path +'/userProfile.php',personData);
  }

}
