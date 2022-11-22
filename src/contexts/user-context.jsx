import React, { createContext, useState, useEffect } from "react";

import {
  authChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.js";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = authChangedListener((userState) => {
      setCurrentUser(userState);
      if (userState) {
        createUserDocumentFromAuth(userState, userState.displayName);
      }
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
