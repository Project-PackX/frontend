import React, { useState } from 'react';
import PackageDataService from "../../services/package.js";

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
            <h1 className="track-title">Track & trace</h1>
            <div className="track-input-container">
                <form className='track-form' onSubmit={(e) => {
                    e.preventDefault();
                    getPackageById();
                }}>
                    <input
                        type='text'
                        value={packageID}
                        onChange={(e) => searchPackage(e)}
                        className="track-input my-3"
                        placeholder="Enter your tracking number"
                    />
                    <button type="submit" className="button track-button mx-3">Track</button>
                </form>
            </div>
            {packageData && (
                <div className="package-details">
                    <h2>Package Details:</h2>
                    <pre>{JSON.stringify(packageData, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
