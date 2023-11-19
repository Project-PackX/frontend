import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    if (localStorage.getItem("login_date") !== null) {
        const current_date = new Date().toISOString();
        const login_date = localStorage.getItem("login_date");
        const diff = Math.abs(new Date(current_date) - new Date(login_date));
        // If the user logged in more than 1 hour ago, the login is deprecated
        if (diff > 3600000) {
            // Remove all data from localStorage except the exchange rates
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("address");
            localStorage.removeItem("phone");
            localStorage.removeItem("user_id");
            localStorage.removeItem("login_date");
            localStorage.removeItem("access_level");
            localStorage.removeItem("historyCount");
            return;
        }
        else {
            return useContext(AuthContext);
        }
    }
    else {
        return useContext(AuthContext);
    }
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