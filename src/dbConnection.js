import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDa9uZ-T-aFt7QAT2rZM8i_A-J18juYgHY",
    authDomain: "react-order-feb3f.firebaseapp.com",
    projectId: "react-order-feb3f",
    storageBucket: "react-order-feb3f.appspot.com",
    messagingSenderId: "816648388868",
    appId: "1:816648388868:web:f80cb4106405149a3d9051",
    measurementId: "G-EC3BH67ETR"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db