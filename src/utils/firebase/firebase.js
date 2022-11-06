// imports from Firebase SDK
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Our Firebase configuration object
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

// Get Firebase authorization object after initialized
export const auth = getAuth();

// Create our database access object to Firebase
export const db = getFirestore();

// Initialize Google provider in Firebase
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign used methods from Firebase
//-----------------------------------
//  Sign-in and Sign-up with Google popup
export const signInWithGoogle = () => {
  try {
    const userCredential = signInWithPopup(auth, googleProvider);
    return userCredential;
  } catch (error) {
    let msg = error.message;
    msg = msg.substring(msg.indexOf("(") + 1, msg.indexOf(")"));
    alert(msg);
    return false;
  }
};

//  Sign-up with Email and Password (no provider)
export const signUpUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    let msg = error.message;
    msg = msg.substring(msg.indexOf("(") + 1, msg.indexOf(")"));
    alert(msg);
    return false;
  }
};

//  Sign-in with Email and Password (no provider)
export const signInWithUserPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    let msg = error.message;
    msg = msg.substring(msg.indexOf("(") + 1, msg.indexOf(")"));
    alert(msg);
    return false;
  }
};

// Create account in users collection
export const createUserDocumentFromAuth = async (userAuth, userName) => {
  if (!userAuth) return;
  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      let { displayName, email } = userAuth;
      if (!displayName) {
        displayName = userName;
      }
      const createdAt = new Date();
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } else {
      return userDocRef;
    }
  } catch (error) {
    let msg = error.message;
    msg = msg.substring(msg.indexOf("(") + 1, msg.indexOf(")"));
    alert(msg);
  }
};
