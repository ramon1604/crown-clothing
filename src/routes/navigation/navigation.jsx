import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="navigation">
        <div className="logo-container">
          <Link to="/">
            <CrownLogo title="Home Page" className="logo" />
          </Link>
          <span title="Previous Page" className="back" onClick={previousPage}>
          &#8656;
          </span>
          <span title="Next Page" className="forward" onClick={nextPage}>
          &#8658;
          </span>
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
