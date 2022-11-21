import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA13J9QDfw2EuWvqCPwJbwuayFG2q-80s4",
    authDomain: "actividadweb-2bfb2.firebaseapp.com",
    projectId: "actividadweb-2bfb2",
    storageBucket: "actividadweb-2bfb2.appspot.com",
    messagingSenderId: "1044093537784",
    appId: "1:1044093537784:web:773b956282161eeda29a0d"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}