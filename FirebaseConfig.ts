// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA98U77HF2vmRBv22x3efAdJYwgO0lMgUg",
  authDomain: "food-app-88c52.firebaseapp.com",
  databaseURL: "https://food-app-88c52-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-app-88c52",
  storageBucket: "food-app-88c52.firebasestorage.app",
  messagingSenderId: "177771763071",
  appId: "1:177771763071:web:e1d80c6ae94d52cd2ab64a",
  measurementId: "G-NL1WTS3TYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);