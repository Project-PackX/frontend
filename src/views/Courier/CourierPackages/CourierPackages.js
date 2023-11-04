import React, { useState, useEffect } from "react";
import PackageService from "../../../services/package";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import './courierpackages.css';

// Import your SVGs here (replace these with your SVGs)
import DispatchSvg from '../../../assets/images/undraw_data_processing_yrrv.svg';
import TransitSvg from '../../../assets/images/undraw_aircraft_re_m05i.svg';
import InWarehouseSvg from '../../../assets/images/undraw_building_re_xfcm.svg';
import InDeliverySvg from '../../../assets/images/undraw_delivery_truck_vt6p.svg';
import DeliveredSvg from '../../../assets/images/undraw_order_delivered_re_v4ab.svg';

export function CourierPackages() {
  const token = localStorage.getItem('token');
  // You can use the decoded user ID from the token if needed.
  const user_id = 0;

  const { isLoggedIn } = useAuth();

  const [packages, setPackages] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");

  useEffect(() => {
    // Store the selected currency in local storage
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const getAllCourierPackages = () => {
    PackageService.getCourierPackages(user_id, token)
      .then((response) => {
        console.log(response.data);

        const formattedPackages = response.data.packages.map((item, index) => {
          if (exchangeRates) {
            const deliveryCostHUF = parseFloat(item.Price);
            const deliveryCostEUR = (deliveryCostHUF * exchangeRates.EUR).toFixed(2);
            const deliveryCostUSD = (deliveryCostHUF * exchangeRates.USD).toFixed(2);
            
            return {
              ...item,
              CreatedAt: new Date(item.CreatedAt).toLocaleString(),
              DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
              DeliveryCostHUF: deliveryCostHUF,
              DeliveryCostEUR: deliveryCostEUR,
              DeliveryCostUSD: deliveryCostUSD,
            };
          }
          return item;
        });

        setPackages(formattedPackages);
        setStatuses(response.data.statuses);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const displayPrice = (item) => {
    switch (selectedCurrency) {
      case "HUF":
        return `${item.DeliveryCostHUF} HUF`;
      case "EUR":
        return `${item.DeliveryCostEUR} EUR`;
      case "USD":
        return `${item.DeliveryCostUSD} USD`;
      default:
        return `${item.DeliveryCostHUF} HUF`;
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

  const handleSkipToNextStatus = (packageId) => {
    return () => {
      PackageService.statusUpdate(packageId, token)
        .then(response => {
          console.log(response.data);
          getAllCourierPackages();
        })
        .catch(e => {
          console.log(e);
        });
    };
  };

  const getStatusSvg = (status) => {
    const svgMap = {
      'Dispatch': DispatchSvg,
      'Transit': TransitSvg,
      'In Warehouse': InWarehouseSvg,
      'In Delivery': InDeliverySvg,
      'Delivered': DeliveredSvg,
    };
    return svgMap[status] || DispatchSvg; // Fallback to DispatchSvg if status is not found.
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates) {
      getAllCourierPackages();
    }
  }, [exchangeRates]);

  if (!isLoggedIn) {
    return (
      <NoPermission />
    );
  }

  return (
    <div>
      <h1>Courier Packages</h1>
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
      {packages.map((item, index) => (
        <div className="col-md-4" key={index}>
          <div className="history-card">
            <div className="history-item">
              <h5 className="card-title">Track ID: {item.TrackID}</h5>
              <h5 className="card-text">Status: {statuses[index]}</h5>
              <p className="card-text">Created At: {item.CreatedAt}</p>
              <p className='card-text'>Sender Locker Address: {item.SenderLockerLabel}</p>
              <p className='card-text'>Destination Locker Address: {item.ReceiverLockerLabel}</p>
              <p className="card-text">Price: {displayPrice(item)}</p>
              <p className="card-text">Delivery Date: {item.DeliveryDate}</p>
              <p className="card-text">Note: {item.Note}</p>
            </div>
            <div className="courier-status-icon">
              <img src={getStatusSvg(statuses[index])} alt={statuses[index]} />
            </div>
            <Link to={`/track/${item.TrackID}`} className="btn login-btn">
              Track
            </Link>
            <button disabled={statuses[index] === "Delivered"} className="btn login-btn" onClick={handleSkipToNextStatus(item.ID)}>Jump to next status</button>
          </div>
        </div>
      ))}
    </div>
  );
}
