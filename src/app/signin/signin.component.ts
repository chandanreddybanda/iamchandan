import { AuthResult } from './../pojo/pojo';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  primeList: string = '';
  N = 100000000000000;
  n = this.N;
  stop = false;
  constructor(public authService: AuthService, public dataService: DataService) {
  }
  loggedIn = {} as AuthResult;
  ngOnInit() { }
  doSignIn() {
    this.authService.GoogleAuth('login').then(ans => this.loggedIn = ans);
  }
  doSignOut() {
    this.authService.GoogleAuth('logout').then(ans => this.loggedIn = ans);
  }
  async doit() {
    this.stop = false;
    while (!this.stop) {
      await timer(1).pipe(take(1)).toPromise();
      let bl = true;

      for (let i = 2; i * i <= this.n && bl; i++)
        if (this.n % i == 0)
          bl = false;

      if (bl) this.primeList += this.n.toString() + ',';
      this.n++;
    }
  }
  dontDoit() {
    this.stop = true;
  }
  clear() {
    this.primeList = '';
    this.n = this.N;
  }
}
