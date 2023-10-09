import React from 'react';

import './contact.css';

export const Contact = () => {
    return (
        <>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Management warehouse</h2>
                    <p className="data" >Hungary Győr-Moson-Sopron 9999 Kismacska Nagymacska street 69. </p>
                    <p className="data" >+36 99 999 99 99 </p>
                    <p className="data" >info@packx.com </p>
                </div>
                <div className="content-right">
                <p className="data" >MAP HERE. </p>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="content-left">
                <p className="data" >MAP HERE. </p>
                </div>
                <div className="text">
                    <h2 className="title content-right">Package point locations</h2>
                    <p className="data" >LOCATIONS DROPDOWN HERE. </p>
                    <button type="select" className="select-btn">Select</button>
                </div>
            </div>           
        </>
    );
}