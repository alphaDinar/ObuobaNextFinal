import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApVndG5ivlqqQI4S51jGe62HFb86dkqCI",
  authDomain: "obuobafm-a1c6c.firebaseapp.com",
  projectId: "obuobafm-a1c6c",
  storageBucket: "obuobafm-a1c6c.appspot.com",
  messagingSenderId: "490975383648",
  appId: "1:490975383648:web:2d8e96cda3da559f3af305",
  measurementId: "G-SGS0Q50J9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);
export const realtimeDB = getDatabase(app);
export const fireStoreDB = getFirestore(app);
export const storageDB = getStorage(app);
// export const realtimeDB =  