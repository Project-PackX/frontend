import React, { useState, useEffect } from "react";
import PackageService from "../../../services/package";
import decode from "jwt-decode";
import {Link} from "react-router-dom";

export function CourierPackages() {
    const token = localStorage.getItem('token');
    const user_id = 1; // You can use the decoded user ID from the token if needed.

    const [packages, setPackages] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        getAllCourierPackages();
    }, []);

    const getAllCourierPackages = () => {
        PackageService.getCourierPackages(user_id, token)
            .then(response => {
                console.log(response.data)
                setPackages(response.data.packages); // Update the packages state with the received data
                setStatuses(response.data.statuses);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleSkipToNextStatus = (packageId) => {
        return () => {
            PackageService.statusUpdate(packageId, token)
                .then(response => {
                    console.log(response.data)
                    getAllCourierPackages();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div>
            <h1>Courier Packages</h1>
            {packages.map((item, index) => (
                <div className="col-md-4" key={index}>
                    <div className="history-card">
                        <div className="history-item">
                            <h5 className="card-title">Track ID: {item.TrackID}</h5>
                            <p className="card-text">Created At: {item.CreatedAt}</p>
                            <p className="card-text">Status: {statuses[index]}</p>
                            <p className="card-text">Created At: {item.CreatedAt}</p>
                            <p className='card-text'>Sender Locker Address: {item.SenderLockerLabel}</p>
                            <p className='card-text'>Destination Locker Address: {item.ReceiverLockerLabel}</p>
                            <p className="card-text">Price: {item.Price}</p>
                            <p className="card-text">Delivery Date: {item.DeliveryDate}</p>
                            <p className="card-text">Note: {item.Note}</p>
                        </div>
                        <Link to={`/track/${item.TrackID}`} className="btn login-btn">
                            Track
                        </Link>
                        <button className="btn login-btn" onClick={handleSkipToNextStatus(item.ID)}>Jump to next status</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
