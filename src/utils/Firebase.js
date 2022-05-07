// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIlVEiBIW6o2EY3UidnABywChgt5sODHw",
    authDomain: "book-catalog-740c6.firebaseapp.com",
    projectId: "book-catalog-740c6",
    storageBucket: "book-catalog-740c6.appspot.com",
    messagingSenderId: "431515751290",
    appId: "1:431515751290:web:1405f831faca7804b33cc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();