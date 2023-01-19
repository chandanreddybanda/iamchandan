import { authResult } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(public authService: AuthService) {
  }
  loggedIn = {} as authResult;
  ngOnInit() {}
  doSignIn(){
    this.authService.GoogleAuth('login').then(ans => this.loggedIn=ans);
  }
  doSignOut() {
    this.authService.GoogleAuth('logout').then(ans => this.loggedIn=ans);
  }
}
