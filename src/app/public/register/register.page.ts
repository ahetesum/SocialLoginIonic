import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    username:  [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    password:  ['', [Validators.required, Validators.minLength(4)]],
    phone_no:  [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    city_id: ['',Validators.required],
  });

  constructor(
    private authService:AuthenticationService, 
    private router: Router, 
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.registrationForm.value)
    this.authService.register((this.registrationForm.value));
  }



  get name() {
    return this.registrationForm.get("name");
  }
  get username() {
    return this.registrationForm.get("username");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get phone_no() {
    return this.registrationForm.get("phone_no");
  }
  get city_id() {
    return this.registrationForm.get("city_id");
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    username: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password cant be lesser than 4 characters' }
    ],
    phone_no: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    city_id: [
      { type: 'required', message: 'City is required' },
    ],
    
  };

}
