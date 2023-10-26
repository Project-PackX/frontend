import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from '../../services/user';
import { useAuth } from '../../context/auth';
import decode from 'jwt-decode';
import './history.css'; // Import your custom CSS file

export const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const { isLoggedIn } = useAuth();
    
    const loadHistory = () => {
        UserDataService.history(
            decode(localStorage.getItem('token')).user_id,
            localStorage.getItem('token')
        )
            .then((response) => {
                // Format the dates and times to be more readable
                const formattedHistory = response.data.message.map(item => ({
                    ...item,
                    CreatedAt: new Date(item.CreatedAt).toLocaleString(),
                    DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
                }));
                setHistory(formattedHistory);
                setLoading(false); // Set loading to false once data is loaded
            })
            .catch((error) => {
                console.error('Error while loading history', error);
                setLoading(false); // Set loading to false in case of an error
            });
    };

    useEffect(() => {
        loadHistory();
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <h1>Please log in to access this feature.</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="history-container">
            {!loading && history.length > 0 && <h1>History</h1>}
            {!loading && history.length > 0 ? (
                // Check if there is history data
                <div className="row">
                    {history.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="history-card">
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
                                <Link to={`/track/${item.TrackID}`} className="btn login-btn">
                                    Track
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            {!loading && history.length === 0 && (
                // If there is no history data, display the image and text
                <div className="no-history">
                    <img src={require("../../assets/images/undraw_void_-3-ggu.svg").default} alt="login" />
                    <h1>You have not sent any package with us yet.</h1>
                    <Link to="/dispatch" className="history-btn">Send now</Link>
                </div>
            )}

        </div>
    );
};
