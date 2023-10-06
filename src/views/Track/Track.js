import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import PackageDataService from "../../services/package.js";
import { PackageStatus } from '../PackageStatus/PackageStatus.js';

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
        <div className="track-container mx-5">
            <h1 className="track-title">Track Shipment</h1>
            <h1 className="track-subtitle">Enter a product number to start tracking</h1>
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
    )
}
