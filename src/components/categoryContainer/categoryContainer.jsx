import React from "react";
import styles from "./categoryContainer.module.scss";
import Button from "../button/button.jsx";
import btnStyles from "../button/button.module.scss";
import { useNavigate } from "react-router-dom";

const CategoryContainer = ({ title, image }) => {
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/shop", {
      state: { title } 
    });
  };

  return (
    <div className={styles.categoryContainer}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className={styles.categoryBodyContainer}>
        <Button type={`button`} btnClass={btnStyles.inverted} onClick={checkoutHandler}>
          Shop {title}
        </Button>
      </div>
    </div>
  );
};
export default CategoryContainer;
