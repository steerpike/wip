import firebase from 'firebase/app'
require('firebase/firestore')
require('firebase/auth')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDVjR-DnlFwAXmDjQENxTnVAR539aFXD2o",
    authDomain: "words-in-progress-43b86.firebaseapp.com",
    databaseURL: "https://words-in-progress-43b86.firebaseio.com",
    projectId: "words-in-progress-43b86",
    storageBucket: "",
    messagingSenderId: "945196997133",
    appId: "1:945196997133:web:6c48284566935824591344",
    measurementId: "G-8VN05ZS6HW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
export const firestore = firebase.firestore()
firestore.enablePersistence()
    .catch(function (err) {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
            console.log('failed-precondition', err)
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log('unimplemented', err)
        }
    });
export const auth = firebase.auth()