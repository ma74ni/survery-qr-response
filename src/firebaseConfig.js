import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA5Ho5mDAQ7r0GwAgL10Jy5lLVStEm1JtE",
  authDomain: "survery-response.firebaseapp.com",
  projectId: "survery-response",
  storageBucket: "survery-response.appspot.com",
  messagingSenderId: "929392254863",
  appId: "1:929392254863:web:bd8b8340fc847d2eefb5fa"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };