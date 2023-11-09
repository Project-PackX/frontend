import React from "react";

import "./no-permission.css";

export const NoPermission = () => {
    return (
        <div className="container no-permission">
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>You have no permission to view this page</h1>
                    <p className="text-muted ">Please log in to access this feature</p>
                    <img className="error-image my-5" src={require("../../../assets/images/undraw_access_denied_re_awnf.svg").default} alt="user-data" />
                </div>
            </div>
        </div>
    )
}