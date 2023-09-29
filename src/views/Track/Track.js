import React from 'react';

import './track.css';

export const Track = () => {
    return (
        <div className="track-container mx-5">
            <h1 className="track-title">Track & trace</h1>
            <div className="track-input-container">
                <input className="track-input my-3" placeholder="Enter your tracking number" />
                <button className="button track-button mx-3">Track</button>
            </div>
        </div>
    )
}