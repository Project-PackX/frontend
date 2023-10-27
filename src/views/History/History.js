import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from '../../services/user';
import LockerDataService from '../../services/locker';
import { useAuth } from '../../context/auth';
import decode from 'jwt-decode';
import './history.css'; 

export const History = () => {
    const [history, setHistory] = useState([]);
    const { isLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [lockerOptions, setLockerOptions] = useState([]);

    const loadLockerOptions = () => {
        LockerDataService.getAll()
            .then((response) => {
                const lockerOptions = response.data.lockers.map((locker) => ({
                    id: locker.ID,
                    label: `${locker.City} - ${locker.Address}`,
                }));
                setLockerOptions(lockerOptions);    
                loadHistory();
            })
            .catch((error) => {
                console.error("Error while loading locker options", error);
            });
    };
    
    
    const loadHistory = () => {
        UserDataService.history(
            decode(localStorage.getItem('token')).user_id,
            localStorage.getItem('token')
        )
            .then((response) => {  
                const formattedHistory = response.data.map(item => {
                    // Parse SenderLockerId and DestinationLockerId as integers
                    const senderLockerId = parseInt(item.SenderLockerId);
                    const destinationLockerId = parseInt(item.DestinationLockerId);
                    const senderLocker = lockerOptions.find((locker) => locker.id === senderLockerId);
                    const receiverLocker = lockerOptions.find((locker) => locker.id === destinationLockerId);
    
                    return {
                        ...item,
                        CreatedAt: new Date(item.CreatedAt).toLocaleString(),
                        DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
                        SenderLockerLabel: senderLocker ? senderLocker.label : "N/A",
                        ReceiverLockerLabel: receiverLocker ? receiverLocker.label : "N/A",
                    };
                });
    
                setHistory(formattedHistory);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error while loading history', error);
                setIsLoading(false);
            });
    };
    
    useEffect(() => {
        loadLockerOptions();
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
            {isLoading && <p>Loading...</p>} {/* Display loading message */}
            {!isLoading && history.length > 0 && <h1>History</h1>}
            {!isLoading && history.length > 0 ? (
                <div className="row">
                    {history.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="history-card">
                                <div className="history-item">
                                    <h5 className="card-title">Package ID: {item.ID}</h5>
                                    <p className="card-text">Created At: {item.CreatedAt}</p>
                                    <p className="card-text">Track ID: {item.TrackID}</p>
                                    <p className="card-text">Sender Locker ID: {item.SenderLockerId}</p>
                                    <p className='card-text'>Sender Locker Address: {item.SenderLockerLabel}</p>
                                    <p className="card-text">Destination Locker ID: {item.DestinationLockerId}</p>
                                    <p className='card-text'>Destination Locker Address: {item.ReceiverLockerLabel}</p>
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
            {!isLoading && history.length === 0 && (
                <div className="no-history">
                    <img src={require("../../assets/images/undraw_void_-3-ggu.svg").default} alt="login" />
                    <h1>You have not sent any package with us yet.</h1>
                    <Link to="/dispatch" className="history-btn">Send now</Link>
                </div>
            )}
        </div>
    );
};
