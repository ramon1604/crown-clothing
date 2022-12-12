import React from "react";
import "./button.scss";

const Button = ({ children, buttonType, clickHandler }) => {
  return (
    <button className={`button-container ${buttonType}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
