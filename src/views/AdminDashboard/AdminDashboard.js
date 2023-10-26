import React from 'react';

import './admindashboard.css';

export const AdminDashboard = () => {
    return (
        <>
            <div className="home-container">
            <h1 className="title">Dashboard</h1>
            <p className="data" >DROPDOWN HERE.</p>
            <button type="select" className="select-btn">Select</button>
            </div>
            
            
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Package point fullness</h2>
                    <p className="data" >DATA BELOW</p>
                </div>
                <div className="content-right">
                    <div className="text">
                        <h2 className="title content-right">Package point inventory</h2>
                        <p className="data" >DATA BELOW</p>
                    </div>                
                </div>
            </div>        
        </>
    );
}