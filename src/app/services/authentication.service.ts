import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

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

   login(loginData){

      console.log(loginData)
      loginData["login_type"]= "email"
      this.apiService.login(JSON.stringify(loginData)).subscribe(res=>{
        console.log(res)
        if(res)
        {
          this.storage.set(TOKEN_KEY,res.data.token).then(res=>{
            this.authenticationState.next(true);
        });
        }
 
      })

       
   }


   register(newUser){
    console.log(newUser)
    newUser["login_type"]="email"
    this.apiService.register(JSON.stringify(newUser)).subscribe(res=>{
      console.log(res)
      this.router.navigate(['public','login']);
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
