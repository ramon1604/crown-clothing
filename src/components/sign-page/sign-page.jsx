import React from "react";

import styles from "./sign-page.module.scss";

import SignUp from "../sign-up/sign-up.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const SignPage = () => {
  return (
    <div className={styles.containerWrapper}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignPage;
