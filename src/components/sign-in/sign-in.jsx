import React, { useState } from "react";

import "./sign-in.scss";
import FormInput from "../form-input/form-input.jsx";
import Button from "../button/button.jsx";
import {
  signInWithUserPassword,
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGoogle();
      await createUserDocumentFromAuth(user, "");
    } catch (error) {
      alert(error.message);
    }
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithUserPassword(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={`sign-up-container`}>
      <h2>I already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={`Email`}
          type={`email`}
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={`Password`}
          type={`password`}
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className={`buttons-container`}>
          <Button type={`submit`} btnClass={``} >
            Sign In
          </Button>
          <Button
            type={`button`}
            btnClass={`google-sign-in`}
            clickHandler={logGoogleUser}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
