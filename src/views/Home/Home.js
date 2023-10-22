import React, { useState, useEffect } from 'react';
import LockerDataService from '../../services/locker';
import { Link } from 'react-router-dom';
import './home.css';

export const Home = () => {
    const [selectedLocker, setSelectedLocker] = useState(0);
    const [lockerOptions, setLockerOptions] = useState([]);
    const [senderLockerAddress, setSenderLockerAddress] = useState('');
    const [formData, setFormData] = useState({
        senderLocker: 0,
        receiverLocker: 0,
    });

    useEffect(() => {
        setSenderLockerAddress(
            formData.senderLocker
                ? lockerOptions.find((locker) => String(locker.id) === String(formData.senderLocker))?.label || ''
                : ''
        );
    }, [formData, lockerOptions]);

    const handleLockerChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectedLocker(value);
    };

    const fetchCoordinates = (address) => {
        const apiUrl = `https://geocode.maps.co/search?q=${address}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    const updatedLockerOptions = [...lockerOptions];
                    updatedLockerOptions[selectedLocker - 1].coordinates = { latitude, longitude };
                    setLockerOptions(updatedLockerOptions);
                }
            })
            .catch((error) => {
                console.error('Error while fetching coordinates:', error);
            });
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
                console.error('Error while loading locker options', error);
            });
    };

    useEffect(() => {
        loadLockerOptions();
    }, []);

    useEffect(() => {
        if (selectedLocker > 0) {
            const selectedLockerInfo = lockerOptions[selectedLocker - 1];
            if (!selectedLockerInfo.coordinates) {
                fetchCoordinates(selectedLockerInfo.label);
            }
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            senderLocker: selectedLocker,
        }));
    }, [selectedLocker, lockerOptions]);

    const calculateCO2= () => {
        let totalkm  = 5234569;
        return (totalkm * 105 * 0.001) //average truck co2 emissions per km
        }

    return (
        <main>
            <div className="container">
                <div className="hero row col-12">
                    <div className="hero-content col-md-6">
                        <h1>Make your life easier <br/> with <span>PackX!</span></h1>
                        <p>Send and receive packages was never quicker and easier.</p>
                        <Link to="/register" className="login-btn py-3 px-4 my-5">Get Started</Link>
                    </div>
                    <div className="hero-image col-md-6">
                        <img src={require('../../assets/images/undraw_delivery_truck_vt6p.svg').default} alt="hero" />
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
                        <p>Our couriers are using 100% electric delivery trucks, we save tons of CO<sub>2</sub> every day.</p>
                    </div>
                    <div className="feature col-md-4">
                        <h3>24/7 Accessibility</h3>
                        <p>Our package delivery service is available around the clock, ensuring you can send or receive your packages at any time that suits you.</p>
                    </div>
                </div>
            </div>
            <div className="features row col-12">
                <div className="container">
                    <div className="packxcolor feature col-md-4">
                        <h3>Together we saved a total amount of</h3>
                        <h5> {calculateCO2()} </h5>
                        <h3>kilogramms of CO2</h3>
                        <p>and counting...</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="sending row col-12">
                    <div className="title col-md-6">
                        <h2>Send your package now</h2>
                    </div>
                    <div className="image col-md-6">
                        <p>Send your package easily from a locker to another one.</p>
                    </div>
                </div>
                <div className="sending-boxes row col-12">
                    <div className="sending-box col-md-4">
                        <h2>Create an account</h2>
                        <img src={require('../../assets/images/undraw_female_avatar_efig.svg').default} alt="box" />
                        <p>You can only dispatch a package if you have a PackX Account. <Link to="/register" className="link">Register now</Link> and get the full experience.</p>
                    </div>
                    <div className="sending-box col-md-4">
                        <h2>Give the package details</h2>
                        <img src={require('../../assets/images/undraw_server_status_re_n8ln.svg').default} alt="box" />
                        <p>You can select the closest locker to you and the destination locker too. Select the size of the package and the delivery method.</p>
                    </div>
                    <div className="sending-box col-md-4">
                        <h2>Track your package</h2>
                        <img src={require('../../assets/images/undraw_location_tracking_re_n3ok.svg').default} alt="box" />
                        <p>You can follow along your package and get a notification when it arrives at the destination.</p>
                    </div>
                </div>
            </div>
            <div className="checkrates features row col-12">
                <div className="container">
                    <div className="checkrates-img col-md-6">
                        <img src={require("../../assets/images/undraw_mobile_search_jxq5.svg").default} alt="login" />
                    </div>
                    <div className="checkrates-form form-container col-md-6 mt-5">
                        <h1 className="title">Check rates</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">From</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option defaultValue>Select the starting location</option>
                                    <option value="1">Győr</option>
                                    <option value="2">Szombathely</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">To</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option defaultValue>Select the destination</option>
                                    <option value="1">Győr</option>
                                    <option value="2">Szombathely</option>
                                </select>
                            </div>
                            <button type="submit" className="login-btn">Check rates</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="checkrates features row col-12">
            <h1 className="title">Package point locations</h1>
                <div className="container">
                <div className="checkrates-img col-md-6">
                    <div style={{ flex: 1 }}>
                        <label htmlFor="senderLocker" className="form-label">
                            Locations
                        </label>
                        <select 
                            name="senderLocker"
                            className="form-select"
                            value={formData.senderLocker}
                            onChange={(e) => handleLockerChange(e)}
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
                {selectedLocker > 0 && lockerOptions[selectedLocker - 1]?.coordinates && (
                        <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                        <iframe
                            title="Locker locations"
                            width="500"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=${lockerOptions[selectedLocker - 1]?.coordinates.latitude},${lockerOptions[selectedLocker - 1]?.coordinates.longitude}&hl=es&z=14&output=embed`}
                        />
                        </div>
                    )}
                    {/* Default */}
                    {selectedLocker === 0 && (
                        <img className="track-image" src={require("../../assets/images/undraw_current_location_re_j130.svg").default} alt="login" />                      
                    )}
                </div>       
                </div>
            </div>
        </main>
    );
}