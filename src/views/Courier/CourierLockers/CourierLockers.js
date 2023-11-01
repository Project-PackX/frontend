import React, {useEffect, useState} from "react";
import LockerDataService from "../../../services/locker";

export function CourierLockers() {

    const token = localStorage.getItem('token');

    const [lockers, setLockers] = useState([]);
    const [fullness, setFullness] = useState([]);

    const getAllLockers = () => {
        LockerDataService.getAll()
        .then((response) => {
            setLockers(response.data.lockers);
            setFullness(response.data.percents);
        })
        .catch((error) => {
            console.error("Error while loading lockers", error);
        });
    }

    console.log(lockers)
    // get fullness of a locker

    useEffect(() => {
        getAllLockers();
    }, []);

    return (
        <div>
        <h1>Courier Lockers</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Capacity</th>
                    <th>Fullness</th>
                    <th>Used</th>
                    <th>Packages</th>
                    <th>Map</th>
                </tr>
            </thead>
            <tbody>
                {lockers.map((locker) => (
                    <tr key={locker.ID}>
                        <td>{locker.ID}</td>
                        <td>{locker.City}</td>
                        <td>{locker.Address}</td>
                        <td>{locker.Capacity}</td>
                        <td>{fullness[locker.ID - 1]} %</td>
                        <td>{locker.Used}</td>
                        <td>{locker.Packages}</td>
                        <td>
                            <a
                                href={"https://www.google.com/maps/place/" + locker.City + "+" + locker.Address}
                                target="_blank"
                                rel="noreferrer"
                                className="btn submit-btn"
                            >
                                Map
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}