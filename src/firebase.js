import firebase from "firebase";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1ib5OeMHor5rW-BMAjW1qJuwZ_vtYBvc",
  //apiKey: process.env.API_KEY,
  authDomain: "vinyls-5ec89.firebaseapp.com",
  databaseURL: "https://vinyls-5ec89.firebaseio.com",
  projectId: "vinyls-5ec89",
  storageBucket: "vinyls-5ec89.appspot.com",
  messagingSenderId: "322737088482",
  appId: "1:322737088482:web:113864a096bdefff5efbbb",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const userRef = firebaseApp.database().ref("users");
