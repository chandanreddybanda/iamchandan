import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
export interface authResult{
  loggedIn: boolean,
  displayName: string | null | undefined,
  error: Error | null | unknown
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  GoogleAuth(login: string) {
    const provider = new GoogleAuthProvider();
    switch(login){
      case 'logout':
        return this.AuthLogout(provider);
      default:
        return this.AuthLogin(provider);
    }
    
  }
  async AuthLogout(provider: GoogleAuthProvider) {
    const ans: authResult = {loggedIn: false,displayName: null,error: null};
    return ans;
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      console.log('You have been successfully logged in!');
      const ans: authResult = {loggedIn: true,displayName: result.user?.displayName,error: null};
      return ans;
    } catch (error) {
      console.log(error);
      const ans: authResult = {loggedIn: false,displayName: null,error: error};
      return ans;
    }
  }
}
