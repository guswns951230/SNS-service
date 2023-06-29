// import "firebase/auth";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const firebaseInstance = firebaseConfig;

// firebase에 관련된 모든것을 export 하는 대신 원하는 서비스만 export

// 인증
export const authService = getAuth();

// fire store
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const dbGetDocs = getDocs;
