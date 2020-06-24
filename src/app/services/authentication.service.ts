import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { analytics } from 'firebase';

const TOKEN_KEY= 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);


  constructor(
    private storage: Storage, 
    private platform: Platform,
    private router:Router, 
    private apiService: ApiService,
    ) {
    this.platform.ready().then(()=>{
      this.checkToken();
    });
  }

   login(loginData, type){
    loginData["login_type"] = type;
      console.log(loginData)
      this.apiService.login(JSON.stringify(loginData)).subscribe(res=>{
        console.log(res)
        if(res)
        {
          this.storage.set(TOKEN_KEY,res.data.token).then(saved=>{
            this.authenticationState.next(true);
        });
        }
        
      })
      return -1;
   }


   register(newUser , login_type){
    console.log(newUser)
    newUser["login_type"]=login_type
    //alert(JSON.stringify(newUser))
    this.apiService.register(JSON.stringify(newUser)).subscribe(res=>{
      //alert(JSON.stringify(res))
      if(newUser.login_type!="email")
      {
        let loginData={};
        loginData["username"]= newUser.username;

        this.login(loginData, newUser.login_type)
      }

      //this.router.navigate(['public','login']);
    })

 }


   logout(){
      return this.storage.remove(TOKEN_KEY).then(()=>{
        this.authenticationState.next(false);
    });
   }

   isAuthenticated()
   {
      return this.authenticationState.value;
   }

   checkToken(){
    return this.storage.get(TOKEN_KEY).then(res=>{
      if(res)
      this.authenticationState.next(true);
  });
   }

}
