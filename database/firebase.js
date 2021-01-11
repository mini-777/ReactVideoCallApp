import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDlSSExgJgyawD5FJ7vn2y-uSKCPwbaGkk",
    authDomain: "react-cam-test.firebaseapp.com",
    databaseURL: "https://react-cam-test-default-rtdb.firebaseio.com",
    projectId: "react-cam-test",
    storageBucket: "react-cam-test.appspot.com",
    messagingSenderId: "160323747251",
    appId: "1:160323747251:web:945b9ad30f67d8234b9fc6",
    measurementId: "G-2G6GY469K5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;

  