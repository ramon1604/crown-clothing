import React from "react";
import "./categoryContainer.scss";
import Button from "../button/button.jsx";
import { useNavigate } from "react-router-dom";

const CategoryContainer = ({ title, image }) => {
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/shop", {
      state: { title } 
    });
  };

  return (
    <div className="category-container">
      <div
        className={`background-image`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="category-body-container">
        <Button type={`button`} btnClass={`inverted`} onClick={checkoutHandler}>
          Shop {title}
        </Button>
      </div>
    </div>
  );
};
export default CategoryContainer;
