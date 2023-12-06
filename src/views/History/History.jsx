import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserDataService from "../../services/user";
import LockerDataService from "../../services/locker";
import PackageDataService from '../../services/package.js';
import { useAuth } from "../../context/auth";
import decode from "jwt-decode";
import "./history.css";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";
import { get } from "jquery";

export const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [lockerOptions, setLockerOptions] = useState([]);
  const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");
  const [tokenDecodingError, setTokenDecodingError] = useState(false);
  const cancelPackage = PackageDataService.cancelPackage;
  const token = localStorage.getItem('token');
  const [packageStatus, setPackageStatus] = useState(null);


  useEffect(() => localStorage.setItem('selectedCurrency', selectedCurrency), [selectedCurrency]);

  const handleCurrencyChange = (currency) => {
      setSelectedCurrency(currency);
      localStorage.setItem('selectedCurrency', currency);
  };

  const getPackageStatus = (id) => {
    PackageDataService.get(id)
      .then((response) => setPackageStatus(response.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (history.length > 0) {
      history.forEach((item) => {
        getPackageStatus(item.TrackID);
      });
    }
  }, [history]);
  
  const isPackageCancellable = (item) => {
    try {
      console.log("packageStatus", item.packageStatus.Status);
      const timeDifference = new Date().getTime() - new Date(item.CreatedAt).getTime();
      const isStatusDispatch = item.packageStatus.Status === "Dispatch";
      const isPackageCancellable = timeDifference < 86400000 && isStatusDispatch;
      return isPackageCancellable;
    } catch (e) {
      console.error("Error getting package status", e);
      return false;
    }
  };
  

  const handleCancelPackage = async (trackId) => {
    try {
      await cancelPackage(trackId, token);
      // After successful cancellation, clear local data and reload history
      setHistory([]);
      setIsLoading(true);
      loadHistory();
      
      // Navigate to the success response page
      navigate("/successfulresponse", { state: { referrer: "cancel" } });
    } catch (error) {
      console.error('Error canceling package', error);
    }
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

  const loadHistory = () => {
    try {
      UserDataService.history(
        decode(localStorage.getItem('token')).user_id,
        localStorage.getItem('token')
      )
        .then(response => {
          const formattedHistory = response.data.map(item => {
            const packageId = item.TrackID;
            const senderLockerId = parseInt(item.SenderLockerId);
            const destinationLockerId = parseInt(item.DestinationLockerId);
            const senderLocker = lockerOptions.find(locker => locker.id === senderLockerId);
            const receiverLocker = lockerOptions.find(locker => locker.id === destinationLockerId);
            const deliveryCostHUF = parseFloat(item.Price);
            const deliveryCostEUR = (deliveryCostHUF * exchangeRates.EUR).toFixed(2);
            const deliveryCostUSD = (deliveryCostHUF * exchangeRates.USD).toFixed(2);
            const emissions = response.data.map(item => parseFloat(item.Co2).toFixed(2));
            const formattedItem = {
              ...item,
              TrackID: packageId,
              CreatedAt: new Date(item.CreatedAt).toLocaleString() || "N/A",
              DeliveryDate: new Date(item.DeliveryDate).toLocaleString() || "N/A",
              SenderLockerLabel: senderLocker ? senderLocker.label : "N/A",
              ReceiverLockerLabel: receiverLocker ? receiverLocker.label : "N/A",
              DeliveryCostHUF: deliveryCostHUF ? deliveryCostHUF : "N/A",
              DeliveryCostEUR: deliveryCostEUR ? deliveryCostEUR : "N/A",
              DeliveryCostUSD: deliveryCostUSD ? deliveryCostUSD : "N/A",
              Emissions: emissions ? emissions : "N/A",
            };
            return exchangeRates ? formattedItem : { ...formattedItem, DeliveryCostHUF: null, DeliveryCostEUR: null, DeliveryCostUSD: null };
          });
          setHistory(formattedHistory);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error while loading history', error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error decoding the token", error);
      setTokenDecodingError(true);
    }
  };

  const displayPrice = (item) => {
    const currency = {
      HUF: `${item.DeliveryCostHUF} HUF`,
      EUR: `${item.DeliveryCostEUR} EUR`,
      USD: `${item.DeliveryCostUSD} USD`,
    };
    return currency[selectedCurrency] || currency.HUF;
  };

  useEffect(() => {
    loadLockerOptions();
  }, []);

  useEffect(() => {
    if (lockerOptions.length > 0 && exchangeRates) {
      loadHistory();
    }
  }, [lockerOptions, selectedCurrency]);

  useEffect(() => {
    const fetchPackageStatus = async (id) => {
      try {
        const response = await PackageDataService.get(id);
        return response.data;
      } catch (e) {
        console.error("Error getting package status", e);
        return null;
      }
    };
  
    const updatePackageStatus = async () => {
      try {
        const updatedHistory = await Promise.all(
          history.map(async (item) => {
            const status = await fetchPackageStatus(item.TrackID);
            return { ...item, packageStatus: status };
          })
        );
        setHistory(updatedHistory);
      } catch (error) {
        console.error("Error updating package status", error);
      }
    };
  
    updatePackageStatus();
  }, [history]);

  if (!isLoggedIn || tokenDecodingError) {
    return <NoPermission />;
  }

  return (
    <div className="container history-container">
      {!isLoading && history.length > 0 && <h1>History</h1>}
      {!isLoading && history.length > 0 ? (
        <div className="row">
          <div className="dropdown text-end">
            <button
              className="button button-primary dropdown-toggle currency-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedCurrency}
            </button>
            <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
              {["HUF", "EUR", "USD"].map(currency => (
                <li key={currency}><a className="dropdown-item" onClick={() => handleCurrencyChange(currency)}>{currency}</a></li>
              ))}
            </ul>
          </div>
          {history.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="history-card">
                <div className="history-item">
                  <h5 className="card-title">Track ID: {item.TrackID}</h5>
                  <p className="card-text emissions-text ">You saved {item.Co2.toFixed(2)} kilogramms of CO2 with this package</p>
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
                {isPackageCancellable(item) && (
                  <button
                    className="btn login-btn"
                    onClick={() => handleCancelPackage(item.TrackID)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
          {history.length % 3 !== 0 && <img src="assets/images/undraw_file_searching_re_3evy.svg" alt="history" />}
        </div>
      ) : null}
      {!isLoading && history.length === 0 && (
        <div className="no-history">
          <img src="assets/images/undraw_void_-3-ggu.svg" alt="login" />
          <h1>You have not sent any package with us yet.</h1>
          <Link to="/dispatch" className="history-btn">
            Send now
          </Link>
        </div>
      )}
    </div>
  );
};