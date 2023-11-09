import React from "react";

import "./alreadyloggedin.css";

export const AlreadyLoggedIn = () => {
    return (
        <div className="container already-logged-in">
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>You have already logged in</h1>
                    <p className="text-muted ">There is no need to log in again</p>
                    <img className="error-image my-5" src="/assets/images/undraw_access_denied_re_awnf.svg" alt="user-data" />
                </div>
            </div>
        </div>
    )
}