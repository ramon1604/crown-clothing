import React, { Fragment, useContext } from "react";

import { UserContext } from "../../contexts/user-context.jsx";

import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.scss";

import { userSignOut } from "../../utils/firebase/firebase.js";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
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
        </div>
        <div className="nav-links-container">
          {currentUser ? (
            <Link className="nav-link" to="/" onClick={userSignOut}>
              Sign Out
            </Link>
          ) : (
            <Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
