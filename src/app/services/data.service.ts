import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private afDatabase: AngularFireDatabase) { }
    GoogleDatabase() {
        this.afDatabase.object("/hello").snapshotChanges().subscribe(data => console.log(data.payload.val()));
    }
}