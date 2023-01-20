import firebase from 'firebase/compat';
export interface AuthResult{
    loggedIn: boolean,
    displayName: string | null | undefined,
    error: Error | null | unknown,
    user: firebase.User | null,
}

