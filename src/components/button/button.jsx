import React from "react";
import styles from "./button.module.scss";

const Button = ({ children, btnClass, ...otherProps }) => {
  return (
    <button className={`${styles.buttonContainer} ${btnClass}`} { ...otherProps } >
      {children}
    </button>
  );
};

export default Button;
