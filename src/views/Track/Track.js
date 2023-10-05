import React, { useState } from 'react';
import PackageDataService from "../../services/package.js";
import { PackageStatus } from '../PackageStatus/PackageStatus.js';

import './track.css';

export const Track = () => {
    const [packageID, setPackageID] = useState('');
    const [packageData, setPackageData] = useState(null);

    const searchPackage = (e) => {
        setPackageID(e.target.value);
    }

    const getPackageById = () => {
        PackageDataService.get(packageID)
            .then((response) => {
                setPackageData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="track-container mx-5">
            {
                !packageData ? (
                    <>
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
                    </>
                ) : (
                    <PackageStatus packageData={packageData} />
                )
            }
        </div>
    )
}
