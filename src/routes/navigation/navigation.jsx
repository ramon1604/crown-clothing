import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/userContext.jsx";
import CartIcon from "../../components/cartIcon/cartIcon.jsx";
import CartDropdown from "../../components/cartDropdown/cartDropdown.jsx";

import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import styles from "./navigation.module.scss";

import { userSignOut } from "../../utils/firebase/firebase.js";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handlerShow = () => setShow((prevShow) => !prevShow);

  const previousPage = () => {
    navigate(-1);
  };

  const nextPage = () => {
    navigate(1);
  };

  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <CrownLogo title="Home Page" className={styles.logo} />
          </Link>
          <span title="Previous Page" className={styles.back} onClick={previousPage}>
          &#8656;
          </span>
          <span title="Next Page" className={styles.forward} onClick={nextPage}>
          &#8658;
          </span>
        </div>
        <div className={styles.navLinksContainer}>
          <Link className={styles.navLink} to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <Link className={styles.navLink} to="/" onClick={userSignOut}>
              Sign Out
            </Link>
          ) : (
            <Link className={styles.navLink} to="/sign-in">
              Sign In
            </Link>
          )}
          <span title="Shopping Cart" onClick={handlerShow}>
            <CartIcon />
          </span>
        </div>
        {show && <CartDropdown handlerDropdown={handlerShow} />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
