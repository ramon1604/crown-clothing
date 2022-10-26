import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWISabgxnYBckx2qRT8M_ZHh45c6pn-FE",
    authDomain: "crown-clothing-db-e251b.firebaseapp.com",
    projectId: "crown-clothing-db-e251b",
    storageBucket: "crown-clothing-db-e251b.appspot.com",
    messagingSenderId: "910373813326",
    appId: "1:910373813326:web:532653822ef486c377d71f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGoogle = () => signInWithPopup(auth, provider)
