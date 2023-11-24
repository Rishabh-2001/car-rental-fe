// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfAGa1RDwxHYEftOeAGr2z-IchUi3sQtI",
  authDomain: "mycart-53299.firebaseapp.com",
  projectId: "mycart-53299",
  storageBucket: "mycart-53299.appspot.com",
  messagingSenderId: "689230580354",
  appId: "1:689230580354:web:759eea4246b831a17f429b",
  measurementId: "G-6GHQ38T0R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage=getStorage()

export default storage;





