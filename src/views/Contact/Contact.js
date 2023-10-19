import React, { useState, useEffect } from 'react';
import LockerDataService from '../../services/locker';
import './contact.css';

const Contact = () => {
    const [selectedLocker, setSelectedLocker] = useState(0); // Store the selected locker
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
            // Check if coordinates are available, and fetch them if not
            const selectedLockerInfo = lockerOptions[selectedLocker - 1];
            if (!selectedLockerInfo.coordinates) {
                fetchCoordinates(selectedLockerInfo.label);
            }
        }

        // Set the selected value for the dropdown when the selectedLocker changes
        setFormData((prevFormData) => ({
            ...prevFormData,
            senderLocker: selectedLocker,
        }));
    }, [selectedLocker, lockerOptions]);

    return (
        <>


            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Management warehouse</h2>
                    <p className="data" >Hungary Győr-Moson-Sopron 9999 Kismacska Nagymacska street 69. </p>
                    <p className="data" >+36 99 999 99 99 </p>
                    <p className="data" >info@packx.com </p>
                </div>
                <div className="content-right">
                <p className="data" >MAP HERE. </p>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                {/* ... Your existing content ... */}
                <div className="mb-3 d-flex align-items-center">
                    <div style={{ flex: 1 }}>
                        <label htmlFor="senderLocker" className="form-label">
                            Sender Locker
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
                <div className="content-right">
                {selectedLocker > 0 && lockerOptions[selectedLocker - 1]?.coordinates && (
                        <iframe
                            title="Google Maps"
                            width="500"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=${lockerOptions[selectedLocker - 1]?.coordinates.latitude},${lockerOptions[selectedLocker - 1]?.coordinates.longitude}&hl=es&z=14&output=embed`}
                        />
                    )}

                    {/* Default map of Hungary */}
                    {selectedLocker === 0 && (
                        <iframe
                            title="Google Maps"
                            width="500"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=47.6920789, 17.6251658&hl=es&z=7&output=embed`} 
                        />
                    )}
                </div>         
            </div>
        </>
    );
};

export default Contact;
