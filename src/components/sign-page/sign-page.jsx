import React from "react";

import SignUp from "../sign-up/sign-up.jsx";
import SignIn from "../sign-in/sign-in.jsx";

import "./sign-page.scss";

const SignPage = () => {
  return (
    <div className={`container-wrapper`}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignPage;
