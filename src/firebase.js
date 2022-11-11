import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyAWIjG4hGr0JefW7wP9cNWek1LM1yyjt5s",
  authDomain: "todolist-f0d66.firebaseapp.com",
  projectId: "todolist-f0d66",
  storageBucket: "todolist-f0d66.appspot.com",
  messagingSenderId: "266241954512",
  appId: "1:266241954512:web:7470eff9d1d7039cda44d5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();