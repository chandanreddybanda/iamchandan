import { AuthResult } from './../pojo/pojo';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(public authService: AuthService, public dataService: DataService) {
  }
  loggedIn = {} as AuthResult;
  ngOnInit() {
    this.dataService.GoogleDatabase();
  }
  doSignIn() {
    this.authService.GoogleAuth('login').then(ans => this.loggedIn = ans);
  }
  doSignOut() {
    this.authService.GoogleAuth('logout').then(ans => this.loggedIn = ans);
  }
}
