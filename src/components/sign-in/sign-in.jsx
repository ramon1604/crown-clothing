import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { msgConditionReturn } from "../../utils/functions/functions.js";

import "./sign-in.scss";

import FormInput from "../formInput/formInput.jsx";
import Button from "../button/button.jsx";

import {
  signInWithUserPassword,
  signInWithGoogle,
} from "../../utils/firebase/firebase.js";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const logGoogleUser = async () => {
    if (msgConditionReturn("user already logged in", "")) return;
    const { user } = await signInWithGoogle();
    if (user) {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgConditionReturn("user already logged in", "")) return;
    const { user } = await signInWithUserPassword(email, password);
    if (user) {
      setFormFields(defaultFormFields);
      navigate("/");
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
          <Button type={`submit`} btnClass={``}>
            Sign In
          </Button>
          <Button
            type={`button`}
            btnClass={`google-sign-in`}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
