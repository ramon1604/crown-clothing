import React, { useContext, useState } from "react";

import { UserContext } from "../../contexts/userContext.jsx";
import CartIcon from "../../components/cartIcon/cartIcon.jsx";
import CartDropdown from "../../components/cartDropdown/cartDropdown.jsx";

import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.scss";

import { userSignOut } from "../../utils/firebase/firebase.js";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handlerShow = () => setShow((prevShow) => !prevShow);

  return (
    <>
      <div className="navigation">
        <div className="logo-container">
          <Link to="/">
            <CrownLogo className="logo" />
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/" onClick={userSignOut}>
              Sign Out
            </Link>
          ) : (
            <Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          )}
          <span onClick={handlerShow}>
            <CartIcon />
          </span>
        </div>
        {show && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
