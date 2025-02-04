// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState("Login");

  // Check for accessToken in sessionStorage on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      setLoginStatus("Logout");
    } else {
      setIsLoggedIn(false);
      setLoginStatus("Login");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginStatus, setLoginStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
