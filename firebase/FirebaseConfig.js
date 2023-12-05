// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "resourcekit-75815.firebaseapp.com",
  projectId: "resourcekit-75815",
  storageBucket: "resourcekit-75815.appspot.com",
  messagingSenderId: "665720398232",
  appId: "1:665720398232:web:5df9a782c96e1dc8ee0bed",
  measurementId: "G-RMWQMTR41J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default { app };
