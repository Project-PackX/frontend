import React, { useState, useEffect } from 'react';
import PackageDataService from "../../services/package.js";
import axios from 'axios';

import './track.css';

export const Track = () => {

    const getPackages = async () => {
        axios.get('http://localhost:4444/api/packages')
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      };

    /* const [packageID, setPackageID] = useState('');

    useEffect(() => {
        getPackageById();
    }, []);

    const searchPackage = (e) => {
        e.preventDefault();
        setPackageID(e.target.value);
    }

    const getPackageById = async () => {
        PackageDataService.get(packageID)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    } */

    return (
        <div className="track-container mx-5">
            <h1 className="track-title">Track & trace</h1>
            <div className="track-input-container">
                {/* <form className='track-form'>
                    <input type='text' value={packageID} onChange={searchPackage} className="track-input my-3" placeholder="Enter your tracking number" />
                    <button onSubmit={getPackageById} className="button track-button mx-3">Track</button>
                </form> */}
                <button onClick={getPackages}>Get Packages</button>
            </div>
        </div>
    )
}