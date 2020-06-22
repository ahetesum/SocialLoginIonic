import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';

const USER_AUTH= 'user-auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userDetails:any;

  constructor(private authService: AuthenticationService,private storage:Storage, private apiService:ApiService) { }

  ngOnInit() {
    //this.getPersonData()
  }

  logout()
  {
      this.authService.logout();
  }



}
