import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import LockerDataService from "../../services/locker";
import PackageDataService from "../../services/package";
import decode from "jwt-decode";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import "./dispatch.css";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";

export const Dispatch = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [error, setError] = useState("");
  const [estDeliveryDate, setEstDeliveryDate] = useState("");
  const [isAfterNoon, setIsAfterNoon] = useState(false);

  const [exchangeRates, setExchangeRates] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [deliveryCostEUR, setDeliveryCostEUR] = useState(0);
  const [deliveryCostUSD, setDeliveryCostUSD] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") ?? "HUF");
  const [tokenDecodingError, setTokenDecodingError] = useState(false);

  const [lockerOptions, setLockerOptions] = useState([]);
  const [senderLockerAddress, setSenderLockerAddress] = useState("");
  const [receiverLockerAddress, setReceiverLockerAddress] = useState("");
  const [formData, setFormData] = useState(() => {
    try {
      const userId = decode(localStorage.getItem("token")).user_id;
      setTokenDecodingError(false);
      return {
        senderLocker: 0,
        receiverLocker: 0,
        receiverName: "",
        receiverEmail: "",
        packageSize: "small",
        isRapid: false,
        isUltraRapid: false,
        isSameDay: false,
        note: "",
        deliveryDate: "",
        userId: userId,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      setTokenDecodingError(true);
      return {};
    }
  });

  useEffect(() => {
    // Store the selected currency in local storage
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency);
  };

  useEffect(() => {
    calculatePrice();
    calculateDeliveryDate();
    setSenderLockerAddress(findLockerAddress(formData.senderLocker));
    setReceiverLockerAddress(findLockerAddress(formData.receiverLocker));
  }, [formData]);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checkboxName) => {
    let isRapidValue = false;
    let isUltraRapidValue = false;
    let isSameDayValue = false;
    let isNormalValue = false;

    if (checkboxName === "isRapid" && !formData.isRapid) {
      isRapidValue = true;
      setIsAfterNoon(false);
    } else if (checkboxName === "isUltraRapid" && !formData.isUltraRapid) {
      isUltraRapidValue = true;
      setIsAfterNoon(false);
    } else if (checkboxName === "isSameDay" && !formData.isSameDay) {
      if (isMorning()) {
        isSameDayValue = true;
      } else {
        setIsAfterNoon(true);
      }
    } else if (checkboxName === "isNormal") {
      isNormalValue = true;
      setIsAfterNoon(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      isRapid: isRapidValue,
      isUltraRapid: isUltraRapidValue,
      isSameDay: isSameDayValue,
      isNormal: isNormalValue,
    }));
  };

  const isMorning = () => {
    const currentHour = new Date().getHours();
    return currentHour < 12;
  };

  const findLockerAddress = (lockerId) => {
    return lockerOptions.find((locker) => String(locker.id) === String(lockerId))?.label || "";
  };

  const fetchExchangeRates = () => {
    fetch("https://open.er-api.com/v6/latest/HUF")
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.rates);
      })
      .catch((error) => {
        console.error("Error while fetching exchange rates", error);
      });
  };

  const loadLockerOptions = () => {
    LockerDataService.getAll()
      .then((response) => {
        const lockerOptions = response.data.lockers.map((locker) => ({
          id: locker.ID,
          label: `${locker.City} - ${locker.Address}`,
        }));

        const uniqueLockerOptions = Array.from(new Set(lockerOptions.map((option) => option.label))).map((label) => {
          return { id: lockerOptions.find((option) => option.label === label).id, label: label };
        });

        setLockerOptions(uniqueLockerOptions);
      })
      .catch((error) => {
        console.error("Error while loading locker options", error);
      });
  };

  useEffect(() => {
    loadLockerOptions();
  }, []);

  const calculateDeliveryDate = () => {
    const deliveryDate = new Date();

    if (formData.isSameDay) {
      deliveryDate.setDate(deliveryDate.getDate());
    } else if (formData.isUltraRapid) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
    } else if (formData.isRapid) {
      deliveryDate.setDate(deliveryDate.getDate() + 3);
    } else {
      deliveryDate.setDate(deliveryDate.getDate() + 7);
    }

    setEstDeliveryDate(deliveryDate.toLocaleDateString());
  };

  const calculatePrice = () => {
    let deliveryCostHUF = 0;

    switch (formData.packageSize) {
      case "small":
        deliveryCostHUF += 390;
        break;
      case "medium":
        deliveryCostHUF += 690;
        break;
      case "large":
        deliveryCostHUF += 890;
        break;
      default:
        console.error("Invalid package size");
        return;
    }

    if (formData.isRapid) {
      deliveryCostHUF += 890;
    }
    if (formData.isUltraRapid) {
      deliveryCostHUF += 1190;
    }
    if (formData.isSameDay) {
      deliveryCostHUF += 1590;
    }

    // Check if both senderLocker and receiverLocker are selected
    if (formData.senderLocker && formData.receiverLocker) {
      const senderLocker = findLockerAddress(formData.senderLocker);
      const receiverLocker = findLockerAddress(formData.receiverLocker);

      if (senderLocker && receiverLocker) {
        if (senderLocker.split(" - ")[0] === receiverLocker.split(" - ")[0]) {
          deliveryCostHUF += 390;
        } else {
          deliveryCostHUF += 790;
        }
      } else {
        console.error("Invalid sender or receiver locker selection");
        return;
      }
    } else {
      console.error("Sender and receiver lockers must be selected");
      return;
    }

    setDeliveryCost(deliveryCostHUF);

    if (exchangeRates) {
      const exchangeRateHUFToEUR = exchangeRates.EUR;
      const exchangeRateHUFToUSD = exchangeRates.USD;
      const deliveryCostEUR = (deliveryCostHUF * exchangeRateHUFToEUR).toFixed(2);
      const deliveryCostUSD = (deliveryCostHUF * exchangeRateHUFToUSD).toFixed(2);
      setDeliveryCostEUR(deliveryCostEUR);
      setDeliveryCostUSD(deliveryCostUSD);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }

    if (formData.senderLocker === formData.receiverLocker) {
      setError("Sender locker and receiver locker cannot be the same");
      return;
    }

    const requestData = {
      SenderLockerId: +formData.senderLocker, // Convert to uint
      DestinationLockerId: +formData.receiverLocker, // Convert to uint
      receiverName: formData.receiverName,
      receiverEmail: formData.receiverEmail,
      packageSize: formData.packageSize,
      isRapid: formData.isRapid,
      isUltraRapid: formData.isUltraRapid,
      isSameDay: formData.isSameDay,
      note: formData.note,
      userId: formData.userId,
      price: deliveryCost,
      DeliveryDate: new Date(estDeliveryDate).toISOString(),
    };

    PackageDataService.new(requestData, localStorage.getItem("token"))
      .then((response) => {
        console.log("Package dispatched successfully");
      })
      .catch((error) => {
        console.error("Error while dispatching the package", error);
        setError("Error while dispatching the package");
      });

    navigate("/successful-send");
  };

  if (!isLoggedIn || tokenDecodingError) {
    return <NoPermission />;
  }

  return (
    <div className="container my-5 col-md-8">
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            <h1>Send Package</h1>
          </div>
          <div className="col-md-6 dropdown text-end">
            <button
              className="button button-primary dropdown-toggle currency-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedCurrency}
            </button>
            <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
              <li>
                <a className="dropdown-item" onClick={() => handleCurrencyChange("HUF")}>
                  HUF
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => handleCurrencyChange("EUR")}>
                  EUR
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => handleCurrencyChange("USD")}>
                  USD
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="user-data p-4 my-4">
        <p>
          Your email address: <strong>{localStorage.getItem("email")}</strong>
        </p>
        <p>
          Your name: <strong>{localStorage.getItem("name")}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center">
          <div style={{ flex: 1 }}>
            <label htmlFor="senderLocker" className="form-label">
              Sender Locker
            </label>
            <select name="senderLocker" className="form-select" value={formData.senderLocker} onChange={handleInputChange}>
              <option value="0">Select Sender Locker</option>
              {lockerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {senderLockerAddress && (
            <a
              href={"https://www.google.com/maps/place/" + senderLockerAddress}
              target="_blank"
              rel="noreferrer"
              className="btn submit-btn map-btn"
            >
              Map
            </a>
          )}
        </div>

        <div className="mb-3 d-flex align-items-center">
          <div style={{ flex: 1 }}>
            <label htmlFor="receiverLocker" className="form-label">
              Receiver Locker
            </label>
            <select name="receiverLocker" className="form-select" value={formData.receiverLocker} onChange={handleInputChange}>
              <option value="0">Select Receiver Locker</option>
              {lockerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {receiverLockerAddress && (
            <a
              href={"https://www.google.com/maps/place/" + receiverLockerAddress}
              target="_blank"
              rel="noreferrer"
              className="btn submit-btn map-btn"
            >
              Map
            </a>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="receiverName" className="form-label">
            Receiver Name
          </label>
          <input
            type="text"
            className="form-control"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="receiverEmail" className="form-label">
            Receiver Email
          </label>
          <input
            type="email"
            className="form-control"
            name="receiverEmail"
            value={formData.receiverEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Package Size</label>
          <div className="d-flex">
            <div className="card package-size-card mx-2">
              <label className={`card-body ${formData.packageSize === "small" ? "border border-primary" : ""}`}>
                <input
                  type="radio"
                  className="form-check-input d-none"
                  name="packageSize"
                  value="small"
                  checked={formData.packageSize === "small"}
                  onChange={handleInputChange}
                />
                <div className="text-center">
                  <img src={"../../assets/icons/box.svg".default} alt="Small Package" className="img-fluid small" />
                  <p className="mb-0">Small</p>
                </div>
              </label>
            </div>
            <div className="card package-size-card mx-2">
              <label className={`card-body ${formData.packageSize === "medium" ? "border border-primary" : ""}`}>
                <input
                  type="radio"
                  className="form-check-input d-none"
                  name="packageSize"
                  value="medium"
                  checked={formData.packageSize === "medium"}
                  onChange={handleInputChange}
                />
                <div className="text-center">
                  <img src={"../../assets/icons/box.svg".default} alt="Medium Package" className="img-fluid medium" />
                  <p className="mb-0">Medium</p>
                </div>
              </label>
            </div>
            <div className="card package-size-card mx-2">
              <label className={`card-body ${formData.packageSize === "large" ? "border border-primary" : ""}`}>
                <input
                  type="radio"
                  className="form-check-input d-none"
                  name="packageSize"
                  value="large"
                  checked={formData.packageSize === "large"}
                  onChange={handleInputChange}
                />
                <div className="text-center">
                  <img src={"../../assets/icons/box.svg".default} alt="Large Package" className="img-fluid large" />
                  <p className="mb-0">Large</p>
                </div>
              </label>
            </div>
          </div>
          {formData.packageSize && (
            <p className="package-size">
              <strong>Package Size:</strong>{" "}
              {formData.packageSize === "small"
                ? "Max size: 20x20x20"
                : formData.packageSize === "medium"
                ? "Max size: 50x50x50"
                : "Max size: 100x100x100"}{" "}
              centimeters
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <textarea className="form-control" name="note" value={formData.note} onChange={handleInputChange} />
        </div>
        <div className="mb-3 form-check">
          <input
            type="radio"
            className="form-check-input"
            id="isNormal"
            checked={!formData.isRapid && !formData.isUltraRapid && !formData.isSameDay}
            onChange={() => handleCheckboxChange("isNormal")}
          />
          <label className="form-check-label" htmlFor="isNormal">
            Normal delivery
          </label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="radio"
            className="form-check-input"
            id="isRapid"
            checked={formData.isRapid}
            onChange={() => handleCheckboxChange("isRapid")}
          />
          <label className="form-check-label" htmlFor="isRapid">
            Rapid delivery
          </label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="radio"
            className="form-check-input"
            id="isUltraRapid"
            checked={formData.isUltraRapid}
            onChange={() => handleCheckboxChange("isUltraRapid")}
          />
          <label className="form-check-label" htmlFor="isUltraRapid">
            UltraRapid delivery
          </label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="radio"
            className="form-check-input"
            id="isSameDay"
            checked={formData.isSameDay}
            onChange={() => handleCheckboxChange("isSameDay")}
          />
          <label className="form-check-label" htmlFor="isSameDay">
            SameDay delivery
          </label>
        </div>

        {isAfterNoon && <div className="alert alert-danger">You can only select SameDay delivery until noon.</div>}

        <div className="mb-3">
          <p>Delivery cost: {displayPrice()}</p>
        </div>

        <div className="mb-3">
          <p>
            Estimated delivery date: <span>{estDeliveryDate}</span>
          </p>
        </div>

        <div>
          <ReCaptchaWidget onRecaptchaChange={setIsRecaptchaVerified} />
        </div>

        <button type="submit" className="btn submit-btn">
          Send
        </button>

        <div className="my-3">
          <p className="text-danger">{error}</p>
        </div>
      </form>
    </div>
  );
};
