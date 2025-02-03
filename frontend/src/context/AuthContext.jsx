// src/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState('Login');

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginStatus, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
