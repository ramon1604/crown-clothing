// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import "./sign-in.scss";
import {
 // auth,
 // signInWithGoogleRedirect,
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGoogle();
    await createUserDocumentFromAuth(user);
  };

  /*
  const logGoogleUserRedirect = async () => {
    await signInWithGoogleRedirect();
  };

  useEffect(() => {
    getRedirectResult(auth).then((response) => {
      if (response) {
        createUserDocumentFromAuth(response.user);
      }
    });
  }, []);
  */

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In with Google</button>
      {/*
      <button onClick={logGoogleUserRedirect}>
        Sign In with Google Redirect
      </button>
     */}
    </div>
  );
};

export default SignIn;
