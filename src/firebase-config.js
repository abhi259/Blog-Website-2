import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDfhcces-QehUxiPFy0oFy75UKhJEr_Oq0",
  authDomain: "blog-website-2-a2fb4.firebaseapp.com",
  projectId: "blog-website-2-a2fb4",
  storageBucket: "blog-website-2-a2fb4.appspot.com",
  messagingSenderId: "899056995184",
  appId: "1:899056995184:web:40efeed3f2c0d1961d9db5",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
