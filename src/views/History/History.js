import React, { useState, useEffect } from 'react';
import UserDataService from '../../services/user';
import PackageDataService from '../../services/package';
import decode from 'jwt-decode';

export const History = () => {

    const [history, setHistory] = useState([])

    const loadHistory = () => {
        // TODO: get the users ID from the token
        UserDataService.history(decode(localStorage.getItem("token")).user_id, localStorage.getItem("token"))
            .then((response) => {
                setHistory(response.data.message)
                console.log(history)
            })
            .catch((error) => {
                console.error("Error while loading history", error);
            });
    }

    const getAllPackage = () => {
        PackageDataService.getAll(localStorage.getItem("token"))
            .then((response) => {
                console.log(response.data)
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
            <button onClick={getAllPackage}>Get all packages</button>
            {history.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item.ID}</p>
                    </div>
                )
            })}
        </div>
    )
}