import React, { createContext, useState } from "react";

import {
  authChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.js";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = { currentUser, setCurrentUser };

  authChangedListener((userState) => {
    if (userState !== currentUser) {
      setCurrentUser(userState);
      if (userState) {
        createUserDocumentFromAuth(userState, userState.displayName);
      }
    }
  });

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
