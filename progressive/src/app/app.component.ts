import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CanIGoOut';

  constructor() {
    debugger;
    const config = {
      apiKey: "AIzaSyBdKO4PvQldfP-5VLW9qqbS6sbUvwpwL8M",
      authDomain: "canigoout-25b12.firebaseapp.com",
      databaseURL: "https://canigoout-25b12.firebaseio.com",
      projectId: "canigoout-25b12",
      storageBucket: "canigoout-25b12.appspot.com",
      messagingSenderId: "433104589309",
      appId: "1:433104589309:web:d8ebcf3a82902ff503c994",
      measurementId: "G-SH80DS4GD5"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    firebase.firestore().enablePersistence()
      .catch(function (err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
    // Subsequent queries will use persistence, if it was enabled successfully
  }

}
