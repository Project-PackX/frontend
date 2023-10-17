import React, { useState, useEffect } from 'react';
import UserDataService from '../../services/user';

export const History = () => {

    const [history, setHistory] = useState([])

    const loadHistory = () => {
        // TODO: get the users ID from the token
        UserDataService.history(1, localStorage.getItem("token"))
            .then((response) => {
                setHistory(response.data.message)
                console.log(history)
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