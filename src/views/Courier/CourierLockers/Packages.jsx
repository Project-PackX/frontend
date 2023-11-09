import { Link, useParams } from "react-router-dom";
import LockerDataService from "../../../services/locker";
import { useEffect, useState } from "react";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import { useAuth } from "../../../context/auth";

export const Packages = () => {
  const { isLoggedIn } = useAuth();

  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem('token');

  const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
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
        const formattedPackages = response.data.Message.map((item) => {
          // Compute delivery costs for each item separately
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
        });

        setPackages(formattedPackages);
      })
      .catch((error) => {
        console.error("Error while loading locker packages", error);
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
              <td>{displayPrice(item)}</td> {/* Pass the item to displayPrice */}
              <td>{item.DeliveryDate}</td>
              <td>{item.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
