import { Link, useParams } from "react-router-dom";
import LockerDataService from "../../../services/locker";
import React, { useEffect, useState } from "react";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import { useAuth } from "../../../context/auth";

export const Packages = () => {
  const { isLoggedIn } = useAuth();

  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem('token');

  const [exchangeRates, setExchangeRates] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [deliveryCostEUR, setDeliveryCostEUR] = useState(0);
  const [deliveryCostUSD, setDeliveryCostUSD] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");

  useEffect(() => {
    // Store the selected currency in local storage
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const getLockerPackages = () => {
    LockerDataService.getPackages(id, token)
      .then((response) => {
        console.log(response.data.Message);
  
        const formattedPackages = response.data.Message.map((item) => {
  
          const deliveryCostHUF = parseFloat(item.Price);
          setDeliveryCost(deliveryCostHUF);
          setDeliveryCostEUR((deliveryCostHUF * exchangeRates.EUR).toFixed(2));
          setDeliveryCostUSD((deliveryCostHUF * exchangeRates.USD).toFixed(2));
  
          return {
            ...item,
            CreatedAt: new Date(item.CreatedAt).toLocaleString(),
            DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
          };
        });
  
        setPackages(formattedPackages);
      })
      .catch((error) => {
        console.error("Error while loading locker packages", error);
      });
  };
  

  const displayPrice = () => {
    switch (selectedCurrency) {
      case "HUF":
        return `${deliveryCost} HUF`;
      case "EUR":
        return `${deliveryCostEUR} EUR`;
      case "USD":
        return `${deliveryCostUSD} USD`;
      default:
        return `${deliveryCost} HUF`;
    }
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
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates) {
      getLockerPackages();
    }
  }, [exchangeRates]);

  if (!isLoggedIn) {
    return (
      <NoPermission />
    );
  }

  return (
    <div>
      <h1>Packages</h1>
      <div className="currency-dropdown-container">
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
      </div>
      <Link className="btn submit-btn" to="/courier-lockers">Back to lockers</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Track ID</th>
            <th>Sender Locker</th>
            <th>Receiver Locker</th>
            <th>Price</th>
            <th>Delivery Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.TrackID}</td>
              <td>{item.SenderLocker}</td>
              <td>{item.ReceiverLocker}</td>
              <td>{displayPrice()}</td>
              <td>{item.DeliveryDate}</td>
              <td>{item.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
