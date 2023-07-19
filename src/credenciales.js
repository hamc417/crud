// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfp2eFd6atiGB4DsfE7iaFlHu5bLVZwBE",
  authDomain: "prueba-crud-e1e68.firebaseapp.com",
  projectId: "prueba-crud-e1e68",
  storageBucket: "prueba-crud-e1e68.appspot.com",
  messagingSenderId: "972353624130",
  appId: "1:972353624130:web:5ec34ab3f7941f3b5335db",
  measurementId: "G-RH7K9FVJDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app