import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check for token presence

    console.log("auth: ", isLoggedIn)

    const login = () => {
        // Handle login logic and set isLoggedIn to true
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Remove all data from localStorage
        localStorage.clear();
        // Handle logout logic and set isLoggedIn to false
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
