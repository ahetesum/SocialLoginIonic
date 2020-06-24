import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  data:any
  newUser:any
  isSocialLogin:boolean

  registrationForm = this.formBuilder.group({
    name: [ '' , [Validators.required, Validators.maxLength(100)]],
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
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder:FormBuilder
    ) { 
      this.route.queryParams.subscribe(params => {
        if (params && params.socialData) {
          this.data = JSON.parse(params.socialData);

        }
        else{
          this.data={};
          this.data["login_type"]="facebook";
          this.data['name']="Ahetesum Ali Biswas";
          this.data['username']="mail.ahliwasum@gmail.com";
          this.data['token']="vdfgsdfgdfgdfgdfgsdfgdfg";
        }
      });
    }

  ngOnInit() {
  }

ionViewDidEnter(){
  if(this.data)
  {
    this.registrationForm.controls['name'].setValue(this.data.name);
    this.registrationForm.controls['username'].setValue(this.data.username);
    this.registrationForm.controls['name'].patchValue(this.data.name);
    this.registrationForm.controls['username'].patchValue(this.data.username);
    this.registrationForm.controls['password'].disable();
    this.registrationForm.controls['username'].updateValueAndValidity();
    this.registrationForm.controls['name'].updateValueAndValidity();
    this.isSocialLogin=true;
  }


}

  register(){
    console.log(this.registrationForm.value)
    this.newUser={};
    if(!this.data)
    {
      this.data = {};
      this.data["login_type"]= "email";
    }
    this.authService.register(this.registrationForm.value , this.data.login_type);
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
