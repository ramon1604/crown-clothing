import React, { useState } from "react";

import { msgConditionReturn } from "../../utils/functions/functions";

import styles from "./sign-up.module.scss";

import FormInput from "../formInput/formInput.jsx";
import Button from "../button/button";

import {
  signUpUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";

import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgConditionReturn("user already logged in", "")) return;
    if (password !== confirmPassword) {
      alert("password and confirmPassword do not match");
      return;
    }
    const { user } = await signUpUserWithEmailAndPassword(email, password);
    if (user) {
      await createUserDocumentFromAuth(user, displayName);
      setFormFields(defaultFormFields);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={styles.signUpContainer}>
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
        <Button type={`submit`} btnClass={``}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
