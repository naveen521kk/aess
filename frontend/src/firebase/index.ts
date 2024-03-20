// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC36BoN2-17su2P9HJYtUhdp-URq5IV5dA",
  authDomain: "hacksavvy-aes-project.firebaseapp.com",
  projectId: "hacksavvy-aes-project",
  storageBucket: "hacksavvy-aes-project.appspot.com",
  messagingSenderId: "983549091463",
  appId: "1:983549091463:web:a7748ad72a7e87409ca222",
  measurementId: "G-Z1HSK0YYZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = () => getAnalytics(app);

export { auth, app };
