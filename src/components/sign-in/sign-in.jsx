// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
  // auth,
  // signInWithGoogleRedirect,
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";

import SignUp from "../sign-up/sign-up";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGoogle();
      await createUserDocumentFromAuth(user, "");
    } catch (error) {
      alert(error.message);
    }
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
    <div className={`sign-in-container`}>
      <h2>Sign In</h2>
      <button className={`buttons-container`} onClick={logGoogleUser}>Sign In with Google</button>
      {/*
      <button onClick={logGoogleUserRedirect}>
        Sign In with Google Redirect
      </button>
     */}
      <SignUp />
    </div>
  );
};

export default SignIn;
