import FormInput from "../form-input/form-input.jsx";
import { useState } from "react";
import {
  signUpUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.js";

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
      <h2>Sign up with your email and password</h2>
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
        <button type={`submit`}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
