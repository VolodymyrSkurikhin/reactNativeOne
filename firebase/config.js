// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQGwiUAfZXAWWUTSolGBH8pMfmkVpznOc",
  authDomain: "vsk1-1922b.firebaseapp.com",
  projectId: "vsk1-1922b",
  storageBucket: "vsk1-1922b.appspot.com",
  messagingSenderId: "837022168043",
  appId: "1:837022168043:web:71372ea793d2e963809fae",
  measurementId: "G-DX31XP4375",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// const analytics = getAnalytics(db);

// export default firebase;
