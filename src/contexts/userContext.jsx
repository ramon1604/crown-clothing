import React, { createContext, useReducer, useEffect } from "react";
import { actionReducer } from "../utils/functions/functions";

import {
  authChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.js";

export const UserContext = createContext();

const REDUCER_INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case `UPDATE_CURRENT_USER`:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in userReducer`);
  }
};

export const UserProvider = (props) => {
  const [{ currentUser }, dispatch] = useReducer(
    userReducer,
    REDUCER_INITIAL_STATE
  );

  useEffect(() => {
    authChangedListener((userState) => {
      if (userState !== currentUser) {
        if (userState) {
          createUserDocumentFromAuth(userState, userState.displayName);
        }
        dispatch(
          actionReducer(`UPDATE_CURRENT_USER`, {
            currentUser: userState,
          })
        );
      }
    });
  }, [currentUser]);

  const user = { currentUser };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
