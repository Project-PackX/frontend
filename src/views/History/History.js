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
    const [exchangeRates, setExchangeRates] = useState(null);
    const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

    const loadLockerOptions = () => {
        LockerDataService.getAll()
            .then((response) => {
                const lockerOptions = response.data.lockers.map((locker) => ({
                    id: locker.ID,
                    label: `${locker.City} - ${locker.Address}`,
                }));
                setLockerOptions(lockerOptions);
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
                const formattedHistory = response.data.map((item) => {
                    const senderLockerId = parseInt(item.SenderLockerId);
                    const destinationLockerId = parseInt(item.DestinationLockerId);

                    const senderLocker = lockerOptions.find((locker) => locker.id === senderLockerId);
                    const receiverLocker = lockerOptions.find((locker) => locker.id === destinationLockerId);

                    const deliveryCostHUF = parseFloat(item.Price);
                    const deliveryCostEUR = (deliveryCostHUF * exchangeRates.EUR).toFixed(2);
                    const deliveryCostUSD = (deliveryCostHUF * exchangeRates.USD).toFixed(2);

                    return {
                        ...item,
                        CreatedAt: new Date(item.CreatedAt).toLocaleString(),
                        DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
                        SenderLockerLabel: senderLocker ? senderLocker.label : "N/A",
                        ReceiverLockerLabel: receiverLocker ? receiverLocker.label : "N/A",
                        PriceHUF: `${deliveryCostHUF} HUF`,
                        PriceEUR: `${deliveryCostEUR} EUR`,
                        PriceUSD: `${deliveryCostUSD} USD`,
                    };
                });

                setHistory(formattedHistory);
                setIsLoading(false);
                setHasLoadedHistory(true);
            })
            .catch((error) => {
                console.error('Error while loading history', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadLockerOptions();
        fetchExchangeRates(); // Fetch exchange rates when the component mounts
    }, []);

    useEffect(() => {
        if (lockerOptions.length > 0 && !hasLoadedHistory) {
            loadHistory();
        }
    }, [lockerOptions, hasLoadedHistory]);

    // Function to fetch exchange rates
    const fetchExchangeRates = () => {
        fetch('https://open.er-api.com/v6/latest/HUF')
            .then((response) => response.json())
            .then((data) => {
                setExchangeRates(data.rates);
            })
            .catch((error) => {
                console.error("Error while fetching exchange rates", error);
            });
    };

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
                                    <p className='card-text'>Sender Locker Address: {item.SenderLockerLabel}</p>
                                    <p className='card-text'>Destination Locker Address: {item.ReceiverLockerLabel}</p>
                                    <p className="card-text">Price (HUF): {item.PriceHUF}</p>
                                    <p className="card-text">Price (EUR): {item.PriceEUR}</p>
                                    <p className="card-text">Price (USD): {item.PriceUSD}</p>
                                    <p className="card-text">Delivery Date: {item.DeliveryDate}</p>
                                    <p className="card-text">Note: {item.Note}</p>
                                </div>
                                <Link to={`/track/${item.TrackID}`} className="btn login-btn">
                                    Track
                                </Link>
                            </div>
                        </div>
                    ))}
                    {history.length % 3 !== 0 && (
                        <img src={require("../../assets/images/undraw_file_searching_re_3evy.svg").default} alt="history" />
                    )}
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
