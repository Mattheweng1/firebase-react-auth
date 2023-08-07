import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/* const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}) */

const app = initializeApp({
  apiKey: "AIzaSyBBvrqv_wA15AY-NxdLSmMAuiTXAuGgEoM",
  authDomain: "auth-development-10e89.firebaseapp.com",
  projectId: "auth-development-10e89",
  storageBucket: "auth-development-10e89.appspot.com",
  messagingSenderId: "1020662713096",
  appId: "1:1020662713096:web:cab104cfeb56aa9a25babd"
})

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export default app