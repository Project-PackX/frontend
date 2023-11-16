import { useState, useEffect } from "react";
import PackageService from "../../../services/package";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import './courierpackages.css';
import LockerDataService from "../../../services/locker";

export function CourierPackages() {
  const token = localStorage.getItem('token');
  const user_id = 0;

  const { isLoggedIn } = useAuth();
  const [packages, setPackages] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [lockerOptions, setLockerOptions] = useState([]);
  const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");
  const access_level = parseInt(localStorage.getItem("access_level"));

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const loadLockerOptions = () => {
    LockerDataService.getAll()
        .then(response => {
          const lockerOptions = response.data.lockers.map(locker => ({
            id: locker.ID,
            label: `${locker.City} - ${locker.Address}`,
          }));
          setLockerOptions(lockerOptions);
        })
        .catch(error => console.error("Error while loading locker options", error));
  };

  useEffect(() => {
    loadLockerOptions();
  }, []);

  const getAllCourierPackages = () => {
    PackageService.getCourierPackages(user_id, token)
      .then((response) => {
        const formattedPackages = response.data.packages.map((item) => {
          if (exchangeRates) {
            console.log(response)
            const senderLockerId = parseInt(item.SenderLockerId);
            const destinationLockerId = parseInt(item.DestinationLockerId);
            const senderLocker = lockerOptions.find(locker => locker.id === senderLockerId);
            const receiverLocker = lockerOptions.find(locker => locker.id === destinationLockerId);
            const deliveryCostHUF = parseFloat(item.Price);
            const deliveryCostEUR = (deliveryCostHUF * exchangeRates.EUR).toFixed(2);
            const deliveryCostUSD = (deliveryCostHUF * exchangeRates.USD).toFixed(2);
            
            return {
              ...item,
              CreatedAt: new Date(item.CreatedAt).toLocaleString(),
              DeliveryDate: new Date(item.DeliveryDate).toLocaleString(),
              SenderLockerLabel: senderLocker ? senderLocker.label : "N/A",
              ReceiverLockerLabel: receiverLocker ? receiverLocker.label : "N/A",
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

  const handleSkipToNextStatus = (packageId) => () => {
    PackageService.statusUpdate(packageId, token)
      .then(response => {
        console.log(response.data);
        getAllCourierPackages();
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (exchangeRates) {
      getAllCourierPackages();
    }
  }, []);

  if (!isLoggedIn || access_level <= 2) {
    return <NoPermission />;
  }

  console.log(packages);

  return (
    <div className="history-container">
      <div className="row">
        <h1>Courier Packages</h1>
        <div className="currency-dropdown-container">
          <div className="dropdown text-end">
            <button className="button button-primary dropdown-toggle currency-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedCurrency}
            </button>
            <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
              {['HUF', 'EUR', 'USD'].map(currency => (
                <li key={currency}>
                  <a className="dropdown-item" onClick={() => handleCurrencyChange(currency)}>{currency}</a>
                </li>
              ))}
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
              <Link to={`/track/${item.TrackID}`} className="btn login-btn">
                Track
              </Link>
              <button disabled={statuses[index] === "Delivered"} className="btn login-btn" onClick={handleSkipToNextStatus(item.ID)}>Jump to next status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
