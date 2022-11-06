import React from "react";

import "./sign-page.scss";

import SignUp from "../sign-up/sign-up.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const SignPage = () => {
  return (
    <div className={`container-wrapper`}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignPage;
