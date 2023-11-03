import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LockerDataService from "../../../services/locker";

import "./courierlockers.css";

export function CourierLockers() {

    const [lockers, setLockers] = useState([]);
    const [fullness, setFullness] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

    const sortLockersByName = () => {
        setSortCriteria("name");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        sortLockers();
    };

    const sortLockersByFullness = () => {
        setSortCriteria("fullness");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        sortLockers();
    };

    // Sorting logic
    const sortLockers = () => {
        const sortedLockers = [...lockers];

        if (sortCriteria === "name") {
            sortedLockers.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.City.localeCompare(b.City);
                } else {
                    return b.City.localeCompare(a.City);
                }
            });
        } else if (sortCriteria === "fullness") {
            sortedLockers.sort((a, b) => {
                const fullnessA = fullness[a.ID - 1];
                const fullnessB = fullness[b.ID - 1];

                if (sortOrder === "asc") {
                    return fullnessA - fullnessB;
                } else {
                    return fullnessB - fullnessA;
                }
            });
        }

        setLockers(sortedLockers);
    };

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
            <div className="col-12">
                <div className="row">
                    <h1 className="col-md-7">Lockers</h1>
                    <button className="btn submit-btn me-3 col-md-2" onClick={sortLockersByName}>
                        Sort by Name {sortCriteria === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                    </button>

                    <button className="btn submit-btn col-md-2" onClick={sortLockersByFullness}>
                        Sort by Fullness {sortCriteria === "fullness" && (sortOrder === "asc" ? "▲" : "▼")}
                    </button>
                </div>
            </div>

                <div className="row">

                    {lockers.map((locker, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="history-card">
                            <div className="history-item">
                                <h5 className="card-title">Locker ID: {locker.ID}</h5>
                                <p className="card-text">City: {locker.City}</p>
                                <p className='card-text'>Locker Address: {locker.Address}</p>
                                <p className="card-text">Capacity: {Math.ceil(locker.Capacity * (fullness[locker.ID - 1] / 100))} / {locker.Capacity}</p>
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
