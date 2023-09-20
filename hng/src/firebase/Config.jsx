// import firebase from 'firebase/app'
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";





// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuDTzRb08eGYJFbfdxbFnyScfpXWY6-Pc",
    authDomain: "my-second-project-6890a.firebaseapp.com",
    projectId: "my-second-project-6890a",
    storageBucket: "my-second-project-6890a.appspot.com",
    messagingSenderId: "1017015816971",
    appId: "1:1017015816971:web:7f758a24f4d7426d28c80e"
  };


// Below is the one that connects the fronted with the backend

//   init firebase 
const app = initializeApp(firebaseConfig)



export const campData = getFirestore(app)



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
