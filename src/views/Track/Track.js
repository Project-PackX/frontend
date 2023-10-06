import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import './track.css';

export const Track = () => {

    const navigate = useNavigate()

    const [packageID, setPackageID] = useState('');

    const searchPackage = (e) => {
        setPackageID(e.target.value);
    }

    const getPackageById = () => {
        navigate('/track/' + packageID)
    }

    return (
        <div className="tracking container row col-12">
            <div className="form-container col-md-6">
                <h1 className="track-title">Package Tracking</h1>
                <h1 className="track-subtitle">You can track your package status by entering your tracking number, which we send you via email.</h1>
                <div className="track-input-container">
                    <form className='track-form' onSubmit={(e) => {
                        e.preventDefault();
                        getPackageById();
                    }}>
                        <div className="input-with-icon">
                            <img src={require('../../assets/icons/search.png')} alt="track" className="search-icon" />
                            <input
                                type='text'
                                value={packageID}
                                onChange={(e) => searchPackage(e)}
                                className="track-input my-3"
                                placeholder="Enter your tracking number"
                            />
                        </div>
                        <button type="submit" className="button track-button mx-3">Track</button>
                    </form>
                </div>
            </div>
            <div className="col-md-6">
                <img className="track-image" src={require("../../assets/images/undraw_current_location_re_j130.svg").default} alt="login" />
            </div>
        </div>
    )
}
