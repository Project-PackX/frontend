import React from "react";

export const Loading = () => {
    return (
        <div className="loading">
            <img src={require("../../assets/loading/loading_trans.gif")}  alt="loading..."/>
        </div>
    );
};