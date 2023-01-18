import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      console.log('You have been successfully logged in!');
    } catch (error) {
      console.log(error);
    }
  }
}
