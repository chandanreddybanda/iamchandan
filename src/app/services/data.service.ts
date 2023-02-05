import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat';
import { limitToFirst, query } from 'firebase/database';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private readonly users: any;

    constructor(private readonly afDatabase: AngularFireDatabase) {
        this.users = this.afDatabase.list('USERS');
    }

    upsertUser(userObj: firebase.User | null) {
        const obj = {
            email: userObj?.email,
            name: userObj?.displayName,
            uid: userObj?.uid,
        };
        this.users.push(obj).then(() => {
            console.log(userObj?.email + ' updated.');
        });

        const ex = query(this.users.query, limitToFirst(1)).toString();
        console.log(ex);
    }
}