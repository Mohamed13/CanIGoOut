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
  }

}
