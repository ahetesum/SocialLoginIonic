import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder ,Validators } from '@angular/forms';

import { LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  loginForm = this.formBuilder.group({
    username:  [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    password:  ['', [Validators.required, Validators.minLength(4)]],
  
  });


  constructor(
    private authService:AuthenticationService, 
    private router: Router,
    private formBuilder:FormBuilder,
    private fb: Facebook,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth
    ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


  login()
  {
      this.authService.login(this.loginForm.value, "email");
        this.loading.dismiss();
  }

  toRegister()
  {
      this.router.navigate(['public','register'])
  }

  loginGoogle()
  {
    this.router.navigate(['public','register'])

  }



  async loginFacebook() {
    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + error)
      });
  }
  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        //alert(JSON.stringify(response.user))
        let faceBookUser={};
        if(response.user )
        {
            if(response.user.displayName)
            {
              faceBookUser['login_type']="facebook";
              faceBookUser['name']=response.user.displayName;
              faceBookUser['username']=response.user.email;
              faceBookUser['token']= response.user.refreshToken
            }
            let loginData= {};
            loginData["username"]= response.user.email

            let fail=this.authService.login(loginData,"facebook");
          //////////////After check///////////
            if(fail==-1)
            {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  socialData: JSON.stringify(faceBookUser),
                }
              };
              this.router.navigate(['public','register'],navigationExtras)
            }
        
        }

        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }


  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  
  public errorMessages = {
    username: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password cant be lesser than 4 characters' }
    ],
  }
}
