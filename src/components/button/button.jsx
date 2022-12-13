import React from "react";
import "./button.scss";

const Button = ({ children, btnClass, clickHandler }) => {
  return (
    <button className={`button-container ${btnClass}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
