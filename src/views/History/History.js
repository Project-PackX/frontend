import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import LockerDataService from '../../services/locker';
import { useAuth } from '../../context/auth';
import decode from 'jwt-decode';
import './history.css';

export const History = () => {
    const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [lockerOptions, setLockerOptions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") ?? "HUF"); // Default currency
  const [currentSelectedCurrency, setCurrentSelectedCurrency] = useState(selectedCurrency);

  useEffect(() => {
    // Store the selected currency in local storage
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
    navigate(0);
  };

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

          // Use the selected currency to display the price
          const price =
            selectedCurrency === 'HUF'
              ? deliveryCostHUF
              : selectedCurrency === 'EUR'
              ? deliveryCostEUR
              : deliveryCostUSD;

          return {
            ...item,
            CreatedAt: new Date(item.CreatedAt).toLocaleString(),
            DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
            SenderLockerLabel: senderLocker ? senderLocker.label : "N/A",
            ReceiverLockerLabel: receiverLocker ? receiverLocker.label : "N/A",
            Price: `${price} ${selectedCurrency}`,
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

  // Fetch exchange rates when the component mounts
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

  useEffect(() => {
    loadLockerOptions();
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (lockerOptions.length > 0) {
      loadHistory();
    }
  }, [lockerOptions, exchangeRates, selectedCurrency]);

  useEffect(() => {
    if (currentSelectedCurrency !== selectedCurrency) {
      // Update the state with the new selected currency
      setCurrentSelectedCurrency(selectedCurrency);

      // Clear the history data and set isLoading to true
      setHistory([]);
      setIsLoading(true);

      // Reload the history data
      loadHistory();
    }
  }, [selectedCurrency]);

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
          <div className="dropdown text-end">
            <button className="button button-primary dropdown-toggle currency-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedCurrency}
            </button>
            <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
              <li><a className="dropdown-item" onClick={() => handleCurrencyChange('HUF')}>HUF</a></li>
              <li><a className="dropdown-item" onClick={() => handleCurrencyChange('EUR')}>EUR</a></li>
              <li><a className="dropdown-item" onClick={() => handleCurrencyChange('USD')}>USD</a></li>
            </ul>
          </div>
          {history.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="history-card">
                <div className="history-item">
                  <h5 className="card-title">Track ID: {item.TrackID}</h5>
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
