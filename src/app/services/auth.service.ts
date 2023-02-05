import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { AuthResult } from '../pojo/pojo';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public dataService: DataService
  ) { }
  // Sign in with Google
  GoogleAuth(login: string) {
    const provider = new GoogleAuthProvider();
    switch (login) {
      case 'logout':
        return this.AuthLogout(provider);
      default:
        return this.AuthLogin(provider);
    }
  }
  // Auth logic to run logout 
  async AuthLogout(provider: GoogleAuthProvider) {
    return {} as AuthResult;
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider).then((res) => {
          this.dataService.upsertUser(res.user);
          return res;
        });
      console.log('You have been successfully logged in! with user name ' + result.user?.displayName);
      return { loggedIn: true, displayName: result.user?.displayName, error: null, user: result.user } as AuthResult;
    } catch (error) {
      console.log(error);
      return { loggedIn: false, displayName: null, error: error, user: null } as AuthResult;
    }
  }
}
