// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');


var firebaseConfig = {
  apiKey: "AIzaSyBdKO4PvQldfP-5VLW9qqbS6sbUvwpwL8M",
  authDomain: "canigoout-25b12.firebaseapp.com",
  databaseURL: "https://canigoout-25b12.firebaseio.com",
  projectId: "canigoout-25b12",
  storageBucket: "canigoout-25b12.appspot.com",
  messagingSenderId: "433104589309",
  appId: "1:433104589309:web:d8ebcf3a82902ff503c994",
  measurementId: "G-SH80DS4GD5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});