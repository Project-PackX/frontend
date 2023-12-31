import { useState, useEffect } from "react";
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

  const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [deliveryCostEUR, setDeliveryCostEUR] = useState(0);
  const [deliveryCostUSD, setDeliveryCostUSD] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");
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
        isNormal: true, // Set "Normal" delivery as default
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

  const currentOrderNumber = parseInt(localStorage.getItem("historyCount"));

  useEffect(() => {
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
    loadLockerOptions();
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
    if (lockerId === "0") {
      return ""; // Skip locker capacity and calculation for the initial "Select Sender/Receiver Locker" option
    }

    return lockerOptions.find((locker) => String(locker.id) === String(lockerId))?.label || "";
  };

  const displayLockerCapacity = (lockerId) => {
    if (lockerId === "0") {
      return 0; // Skip locker capacity for the initial "Select Sender/Receiver Locker" option
    }

    return (
      lockerOptions.find((option) => option.id === +lockerId).maxcapacity -
      lockerOptions.find((option) => option.id === +lockerId).numberofpackages
    );
  };

  const loadLockerOptions = () => {
    LockerDataService.getAll()
      .then((response) => {
        const { lockers, numberofpackages, percents } = response.data;

        const lockerOptions = lockers.map((locker, i) => ({
          id: locker.ID,
          label: `${locker.City} - ${locker.Address}`,
          numberofpackages: numberofpackages[i], // Assign numberofpackages from the response
          percents: percents[i], // Assign percents from the response
          maxcapacity: locker.Capacity,
        }));

        const uniqueLockerOptions = Array.from(new Set(lockerOptions.map((option) => option.label))).map((label) => ({
          id: lockerOptions.find((option) => option.label === label).id,
          label: label,
          numberofpackages: lockerOptions.find((option) => option.label === label).numberofpackages,
          percents: lockerOptions.find((option) => option.label === label).percents,
          maxcapacity: lockerOptions.find((option) => option.label === label).maxcapacity,
        }));

        setLockerOptions(uniqueLockerOptions);
      })
      .catch((error) => console.error("Error while loading locker options", error));
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
        deliveryCostHUF += 590;
        break;
      case "large":
        deliveryCostHUF += 890;
        break;
      default:
        console.error("Invalid package size");
        return;
    }

    if (formData.isRapid) {
      deliveryCostHUF += 590;
    }
    if (formData.isUltraRapid) {
      deliveryCostHUF += 990;
    }
    if (formData.isSameDay) {
      deliveryCostHUF += 1490;
    }

    if (formData.senderLocker && formData.receiverLocker) {
      const senderLocker = findLockerAddress(formData.senderLocker);
      const receiverLocker = findLockerAddress(formData.receiverLocker);

      if (senderLocker && receiverLocker) {
        const senderCity = senderLocker.split(" - ")[0];
        const receiverCity = receiverLocker.split(" - ")[0];
      
        if (senderCity === receiverCity) {
          deliveryCostHUF += 390;
        } else {
          if (
            (senderCity === "Győr" && receiverCity === "Budapest") ||
            (senderCity === "Budapest" && receiverCity === "Győr")
          ) {
            deliveryCostHUF += 590;
          } else if (
            (senderCity === "Győr" && receiverCity === "Szombathely") ||
            (senderCity === "Szombathely" && receiverCity === "Győr")
          ) {
            deliveryCostHUF += 490;
          } else {
            deliveryCostHUF += 690;
          }
        }
      } else {
        console.error("Sender and receiver lockers must be selected");
        return;
      }
      

      if (currentOrderNumber >= 7) {
        deliveryCostHUF /= 1.1;
      } else if (currentOrderNumber >= 5 && currentOrderNumber < 7) {
        deliveryCostHUF /= 1.075;
      } else if (currentOrderNumber >= 3 && currentOrderNumber < 5) {
        deliveryCostHUF /= 1.05;
      }

      setDeliveryCost(Math.round(deliveryCostHUF));

      if (exchangeRates) {
        const exchangeRateHUFToEUR = exchangeRates.EUR;
        const exchangeRateHUFToUSD = exchangeRates.USD;
        const deliveryCostEUR = (deliveryCostHUF * exchangeRateHUFToEUR).toFixed(2);
        const deliveryCostUSD = (deliveryCostHUF * exchangeRateHUFToUSD).toFixed(2);
        setDeliveryCostEUR(deliveryCostEUR);
        setDeliveryCostUSD(deliveryCostUSD);
      }
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

    // Make a request to the server
    PackageDataService.new(requestData, localStorage.getItem("token"))
      .then(() => {
        console.log("Package dispatched successfully");
        localStorage.setItem("historyCount", currentOrderNumber + 1);
        navigate("/successfulresponse", { state: { referrer: "dispatch" } });
      })
      .catch((error) => {
        const serverResponse = error.response.data.Message; // Define serverResponse here

        if (serverResponse === "Sender locker's capacity is full") {
          setError(
            <div className="alert alert-danger">Sender locker's capacity is full. Please choose a different sender locker.</div>
          );
        } else if (serverResponse === "Destination locker's capacity is full") {
          setError(
            <div className="alert alert-danger">Destination locker's capacity is full. Please choose a different receiver locker.</div>
          );
        } else {
          console.error("Error while dispatching the package", error);
          setError(<div className="alert alert-danger">Error while dispatching the package</div>);
        }
      });
  };

  const getLoyaltyPercentage = (level) => {
    if (level >= 7) {
      return 10;
    }
    if (level >= 5) {
      return 7.5;
    }
    if (level >= 3) {
      return 5;
    }
    return 0;
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
              {["HUF", "EUR", "USD"].map((currency) => (
                <li key={currency}>
                  <a className="dropdown-item" onClick={() => handleCurrencyChange(currency)}>
                    {currency}
                  </a>
                </li>
              ))}
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
              href={`https://www.google.com/maps/place/${senderLockerAddress}`}
              target="_blank"
              rel="noreferrer"
              className="btn submit-btn map-btn"
            >
              Map
            </a>
          )}
          {senderLockerAddress && <p className="capacity-display">Capacity: {displayLockerCapacity(formData.senderLocker)}</p>}
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
              href={`https://www.google.com/maps/place/${receiverLockerAddress}`}
              target="_blank"
              rel="noreferrer"
              className="btn submit-btn map-btn"
            >
              Map
            </a>
          )}
          {receiverLockerAddress && <p className="capacity-display">Capacity: {displayLockerCapacity(formData.receiverLocker)}</p>}
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
            {["small", "medium", "large"].map((size) => (
              <div className="card package-size-card mx-2" key={size}>
                <label className={`card-body ${formData.packageSize === size ? "border border-primary" : ""}`}>
                  <input
                    type="radio"
                    className="form-check-input d-none"
                    name="packageSize"
                    value={size}
                    checked={formData.packageSize === size}
                    onChange={handleInputChange}
                  />
                  <div className="text-center">
                    <img src="/assets/icons/box.svg" alt={`${size} Package`} className={`img-fluid ${size}`} />
                    <p className="mb-0">{size.charAt(0).toUpperCase() + size.slice(1)}</p>
                  </div>
                </label>
              </div>
            ))}
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

        {["Normal", "Rapid", "UltraRapid", "SameDay"].map((deliveryType) => (
          <div className="mb-3 form-check" key={deliveryType}>
            <input
              type="radio"
              className="form-check-input"
              id={`is${deliveryType}`}
              checked={formData[`is${deliveryType}`]}
              onChange={() => handleCheckboxChange(`is${deliveryType}`)}
            />
            <label className="form-check-label" htmlFor={`is${deliveryType}`}>{`${deliveryType} delivery`}</label>
          </div>
        ))}

        {isAfterNoon && <div className="alert alert-danger">You can only select SameDay delivery until noon.</div>}

        <div className="mb-3">
          <p>Delivery cost: {displayPrice()}</p>
        </div>

        <div className="mb-3">
          {currentOrderNumber >= 3 && (
            <p>Loyalty discount of {getLoyaltyPercentage(currentOrderNumber)}% has been automatically subtracted.</p>
          )}
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
