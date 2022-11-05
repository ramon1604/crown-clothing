import React, { useState } from "react";

import "./sign-up.scss";
import FormInput from "../form-input/form-input.jsx";
import {
  signUpUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";
import Button from "../button/button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password and confirmPassword do not match");
      return;
    }
    try {
      const { user } = await signUpUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, displayName);
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
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={`Display Name`}
          type={`text`}
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label={`Confirm Password`}
          type={`password`}
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type={`submit`} btnClass={``} >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
