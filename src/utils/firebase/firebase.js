import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWISabgxnYBckx2qRT8M_ZHh45c6pn-FE",
  authDomain: "crown-clothing-db-e251b.firebaseapp.com",
  projectId: "crown-clothing-db-e251b",
  storageBucket: "crown-clothing-db-e251b.appspot.com",
  messagingSenderId: "910373813326",
  appId: "1:910373813326:web:532653822ef486c377d71f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signUpUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithUserPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user
  } catch (error) {
    alert(error.message);
    return false
  }
};

export const createUserDocumentFromAuth = async (userAuth, userName) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    let { displayName, email } = userAuth;
    if (!displayName) {
      displayName = userName;
    }
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return userDocRef;
  }
};
