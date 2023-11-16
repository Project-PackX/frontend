import React, { useState, useEffect } from "react";
import LockerDataService from "../../services/locker";
import UserDataService from "../../services/user";
import EmissionDataService from "../../services/emissions";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import "./home.css";

export const Home = () => {
  const { isLoggedIn } = useAuth();
  const access_level = parseInt(localStorage.getItem("access_level"));
  const [selectedLocker, setSelectedLocker] = useState(0);
  const [lockerOptions, setLockerOptions] = useState([]);
  const [selectedLockerForMap, setSelectedLockerForMap] = useState(0);
  const [formData, setFormData] = useState({ senderLocker: 0, receiverLocker: 0 });
  const [showMap, setShowMap] = useState(false);
  const [cost, setCost] = useState(0);
  const [emission, setEmission] = useState(0);

  const [exchangeRates, setExchangeRates] = useState(null);
  // Set default currency to HUF if not set yet
  if (!localStorage.getItem("selectedCurrency")) {
    localStorage.setItem("selectedCurrency", "HUF");
  }
  localStorage.setItem("exchangeRates", JSON.stringify(exchangeRates));

  const fetchExchangeRates = () => {
    fetch("https://open.er-api.com/v6/latest/HUF")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error while fetching exchange rates", error));
  };

  const [historyCount, setHistoryCount] = useState(0);

  const loadHistory = () => {
    try {
      UserDataService.history(decode(localStorage.getItem("token")).user_id, localStorage.getItem("token"))
        .then((response) => {
          const historyCount = response.data.length;
          setHistoryCount(historyCount);
          localStorage.setItem("historyCount", historyCount);
        })
        .catch((error) => {
          console.error("Error while loading history", error);
        });
    } catch (error) {
      console.error("Error decoding the token", error);
    }
  };

  const calculateCost = () => {

    // Colsole log all locker info
    console.log("Locker Options:", lockerOptions);

    const senderLabel = lockerOptions[formData.senderLocker - 1]?.label.split(" - ")[0];
    const receiverLabel = lockerOptions[formData.receiverLocker - 1]?.label.split(" - ")[0];
    
  
    console.log("Sender Label:", senderLabel);
    console.log("Receiver Label:", receiverLabel);
  
    // Check if both sender and receiver are in the same city
    let sameCity = senderLabel === receiverLabel;
  
    console.log("Same City:", sameCity);
  
    // Set the cost based on whether they are in the same city or not
    let calculatedCost = sameCity ? 390 : 490;
  
    // Include exchange rates if available
    if (exchangeRates) {
      const selectedCurrency = localStorage.getItem("selectedCurrency");
  
      if (selectedCurrency === "HUF") {
        setCost(`${calculatedCost} HUF`);
        return;
      } else if (selectedCurrency === "EUR") {
        calculatedCost = calculatedCost * exchangeRates.EUR;
        setCost(`${calculatedCost} EUR`);
      } else if (selectedCurrency === "USD") {
        calculatedCost = calculatedCost * exchangeRates.USD;
        setCost(`${calculatedCost} USD`);
      }
      else {
        setCost(`${calculatedCost} HUF`);
      }
    }  
  };

  useEffect(() => {
    calculateCost();
  }, [formData.senderLocker, formData.receiverLocker]);

  useEffect(() => {
    let timer;
    setShowMap(false);

    if (selectedLocker > 0) {
      timer = setTimeout(() => setShowMap(true), 500);
    }

    return () => clearTimeout(timer);
  }, [selectedLocker]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, senderLocker: selectedLocker }));
  }, [selectedLocker, lockerOptions]);

  const handleLockerChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value !== selectedLocker) {
      setSelectedLockerForMap(value);
      setShowMap(false);
    }
  };

  const fetchCoordinates = (address) => {
    const apiUrl = `https://geocode.maps.co/search?q=${address}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          const updatedLockerOptions = [...lockerOptions];
          updatedLockerOptions[selectedLockerForMap - 1].coordinates = { latitude: lat, longitude: lon };
          setLockerOptions(updatedLockerOptions);
        }
      })
      .catch((error) => {
        console.error("Error while fetching coordinates:", error);
      });
  };

  const getEmission = () => {
    EmissionDataService.getEmissions()
      .then((response) => {
        setEmission(response.data.All.toFixed(3));
      })
      .catch((error) => {
        console.error("Error while loading emission", error);
      });
  };

  const loadLockerOptions = () => {
    LockerDataService.getAll()
      .then((response) => {
        const lockerOptions = response.data.lockers.map((locker) => ({
          id: locker.ID,
          label: `${locker.City} - ${locker.Address}`,
        }));

        const uniqueLockerOptions = Array.from(new Set(lockerOptions.map((option) => option.label))).map((label) => ({
          id: lockerOptions.find((option) => option.label === label).id,
          label: label,
        }));

        setLockerOptions(uniqueLockerOptions);
      })
      .catch((error) => {
        console.error("Error while loading locker options", error);
      });
  };

  useEffect(() => {
    loadHistory();
    getEmission();
    fetchExchangeRates();
    loadLockerOptions();
  }, []);

  useEffect(() => {
    if (selectedLockerForMap > 0) {
      const selectedLockerInfo = lockerOptions[selectedLockerForMap - 1];
      if (!selectedLockerInfo.coordinates) {
        fetchCoordinates(selectedLockerInfo.label);
      }
    }
  }, [selectedLockerForMap, lockerOptions]);

  return (
    <main>
      <div className="container">
        <div className="hero row col-12">
          <div className="hero-content col-md-6">
            <h1>
              Make your life easier <br /> with <span>PackX!</span>
            </h1>
            <p>Send and receive packages was never quicker and easier.</p>
            {isLoggedIn ? (
              access_level === 2 ? (
                <Link to="/courier-lockers" className="login-btn py-3 px-4 my-5">
                  Get Started
                </Link>
              ) : (
                <Link to="/dispatch" className="login-btn py-3 px-4 my-5">
                  Get Started
                </Link>
              )
            ) : (
              <Link to="/register" className="login-btn py-3 px-4 my-5">
                Get Started
              </Link>
            )}
          </div>
          <div className="hero-image col-md-6">
            <img src="/assets/images/undraw_delivery_truck_vt6p.svg" alt="hero" />
          </div>
        </div>
      </div>
      <div className="features row col-12">
        <div className="container">
          <div className="feature col-md-4">
            <h3>Really fast</h3>
            <p>With the PackX Rapid Delivery your package arrives in 3 business days to your selected destination.</p>
          </div>
          <div className="feature col-md-4">
            <h3>Eco-friendly</h3>
            <p>
              Our couriers are using 100% electric delivery trucks, we save tons of CO<sub>2</sub> every day.
            </p>
          </div>
          <div className="feature col-md-4">
            <h3>24/7 Accessibility</h3>
            <p>
              Our package delivery service is available around the clock, ensuring you can send or receive your packages at any time
              that suits you.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row"></div>
        <div className="sending col-12">
          <div className="title col-md-6">
            <h2>Send your package now</h2>
          </div>
          <div className="col-md-6">
            <p>
              Create your PackX Account and send your package easily from a locker to another one. You can track the package to make
              sure it arrives to the destination in time.
            </p>
          </div>
        </div>
        <div className="sending-boxes row col-12">
          <div className="sending-box col-md-4">
            <h2>Create an account</h2>
            <img src="/assets/images/undraw_female_avatar_efig.svg" alt="box" />
            <p>
              You can only dispatch a package if you have a PackX Account.{" "}
              <Link to="/register" className="link">
                Register now
              </Link>{" "}
              and get the full experience.
            </p>
          </div>
          <div className="sending-box col-md-4">
            <h2>Give the package details</h2>
            <img src="/assets/images/undraw_server_status_re_n8ln.svg" alt="box" />
            <p>
              You can select the closest locker to you and the destination locker too. Select the size of the package and the delivery
              method.
            </p>
          </div>
          <div className="sending-box col-md-4">
            <h2>Track your package</h2>
            <img src="/assets/images/undraw_location_tracking_re_n3ok.svg" alt="box" />
            <p>You can follow along your package and get a notification when it arrives at the destination.</p>
          </div>
        </div>
      </div>
      <div className="checkrates features row col-12">
        <div className="container">
          <div className="checkrates-img col-md-6">
            <img src="/assets/images/undraw_mobile_search_jxq5.svg" alt="login" />
          </div>
          <div className="checkrates-form form-container col-md-6 mt-5">
            <h1 className="title">Check rates</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="senderLocker" className="form-label">
                  From
                </label>
                <select
                  name="senderLocker"
                  className="form-select"
                  value={formData.senderLocker}
                  onChange={(e) => setFormData({ ...formData, senderLocker: e.target.value })}
                  aria-label="Sender Locker"
                >
                  <option defaultValue>Select the starting location</option>
                  {lockerOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="receiverLocker" className="form-label">
                  To
                </label>
                <select
                  name="receiverLocker"
                  className="form-select"
                  value={formData.receiverLocker}
                  onChange={(e) => setFormData({ ...formData, receiverLocker: e.target.value })}
                  aria-label="Receiver Locker"
                >
                  <option defaultValue>Select the destination</option>
                  {lockerOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {formData.senderLocker !== 0 && formData.receiverLocker !== 0 && (
                <p className="cost-display">Delivery cost: {cost}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="green row col-12">
        <div className="container">
          <div className="packxcolor feature col-md-4">
            <h3>Together we saved a total amount of</h3>
            <h5> {emission} </h5>
            <h3>kilogramms of CO2</h3>
            <p>and counting...</p>
          </div>
        </div>
      </div>
      <div className="package-locations row col-12">
        <h1 className="home-title">Package point locations</h1>
        <div className="container">
          <div className="checkrates-img col-md-6">
            <div style={{ flex: 1 }}>
              <label htmlFor="senderLocker" className="form-label">
                Locations
              </label>
              <select
                name="senderLockerForMap"
                className="form-select"
                value={selectedLockerForMap}
                onChange={(e) => handleLockerChange(e)}
                style={{ maxWidth: "300px" }}
              >
                <option value="0">Select Sender Locker</option>
                {lockerOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Embed Google Map */}
          <div className="checkrates-form form-container col-md-6 mt-5">
            <div className="map-home">
              {selectedLockerForMap !== 0 && (
                <div className="loading-logo">
                  <img src="/assets/loading/loading_trans.gif" alt="loading" />
                </div>
              )}
              {selectedLockerForMap > 0 && lockerOptions[selectedLockerForMap - 1]?.coordinates && (
                <div className={`location-map ${showMap ? "" : "hidden"}`}>
                  <iframe
                    title="map"
                    src={`https://maps.google.com/maps?q=${lockerOptions[selectedLockerForMap - 1]?.coordinates?.latitude || 0},${
                      lockerOptions[selectedLockerForMap - 1]?.coordinates?.longitude || 0
                    }&hl=en&z=14&output=embed`}
                    width="900rem"
                    height="600rem"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    className="location-map"
                  ></iframe>
                </div>
              )}
              {selectedLockerForMap === 0 && (
                <div className="image-container">
                  <img
                    className="home-map-image"
                    src="/assets/images/undraw_current_location_re_j130.svg"
                    alt="login"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
