import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// INITIALISE FIREBASE INSTANCES
export const app = firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
// } else {
//   const app = firebase.app();
// }
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// FIREBASE AUTH METHODS
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithRedirect(provider);
