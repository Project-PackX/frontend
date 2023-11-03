import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LockerDataService from "../../../services/locker";

import "./courierlockers.css";

export function CourierLockers() {
    const token = localStorage.getItem("token");

    const [lockers, setLockers] = useState([]);
    const [fullness, setFullness] = useState([]);

    function getProgressBarColorClass(percentage) {
        if (percentage <= 50) {
            return "green-bar";
        } else if (percentage <= 70) {
            return "yellow-bar";
        } else {
            return "red-bar";
        }
    }

    const getAllLockers = () => {
        LockerDataService.getAll()
            .then((response) => {
                setLockers(response.data.lockers);
                setFullness(response.data.percents);
            })
            .catch((error) => {
                console.error("Error while loading lockers", error);
            });
    };

    useEffect(() => {
        getAllLockers();
    }, []);

    const calculateProgressBarStyle = (percentage) => {
        return {
            width: percentage + "%",
        };
    };

    return (
        <div className="container my-5">
                <h1>Lockers</h1>
                <div className="row">
                {lockers.map((locker, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="history-card">
                            <div className="history-item">
                                <h5 className="card-title">Locker ID: {locker.ID}</h5>
                                <p className="card-text">City: {locker.City}</p>
                                <p className='card-text'>Locker Address: {locker.Address}</p>
                                <p className="card-text">Capacity: {locker.Capacity}</p>
                                <div className="progress">
                                    <div
                                        className={`progress-bar ${getProgressBarColorClass(fullness[locker.ID - 1])}`}
                                        style={calculateProgressBarStyle(fullness[locker.ID - 1])}
                                    >
                                        {fullness[locker.ID - 1]}%
                                    </div>
                                </div>
                            </div>
                            <Link
                                className="btn submit-btn me-3"
                                to={`/locker/packages/${locker.ID}`}
                            >
                                Show Packages
                            </Link>
                            <a
                                href={
                                    "https://www.google.com/maps/place/" +
                                    locker.City +
                                    "+" +
                                    locker.Address
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn submit-btn"
                            >
                                Map
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
