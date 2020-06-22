import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder ,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


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
    ) { }

  ngOnInit() {
  }

  login()
  {
      this.authService.login(this.loginForm.value);
  }

  toRegister()
  {
      this.router.navigate(['public','register'])
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
