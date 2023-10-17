import React, { useState, useEffect } from 'react';
import UserDataService from '../../services/user';
import decode from 'jwt-decode';

import "./history.css"

export const History = () => {
    const [history, setHistory] = useState([])

    const loadHistory = () => {
        UserDataService.history(decode(localStorage.getItem("token")).user_id, localStorage.getItem("token"))
            .then((response) => {
                setHistory(response.data.message);
            })
            .catch((error) => {
                console.error("Error while loading history", error);
            });
    }

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div>
            <h1>History</h1>
            <div className="row">
                {history.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <div className="history-item">
                                <h5 className="card-title">Package ID: {item.ID}</h5>
                                <p className="card-text">Created At: {item.CreatedAt}</p>
                                <p className="card-text">Track ID: {item.TrackID}</p>
                                <p className="card-text">Sender Locker ID: {item.SenderLockerId}</p>
                                <p className="card-text">Destination Locker ID: {item.DestinationLockerId}</p>
                                <p className="card-text">Price: {item.Price}</p>
                                <p className="card-text">Delivery Date: {item.DeliveryDate}</p>
                                <p className="card-text">Note: {item.Note}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
