import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import LockerDataService from '../../services/locker';
import PackageDataService from '../../services/package';
import decode from 'jwt-decode';

const Dispatch = () => {
    const { isLoggedIn } = useAuth();

    const [lockerOptions, setLockerOptions] = useState([]);
    const [formData, setFormData] = useState({
        senderLocker: '',
        receiverLocker: '',
        receiverName: '',
        receiverEmail: '',
        packageSize: 'small',
        isRapid: false,
        note: '',
        userId: decode(localStorage.getItem("token")).user_id
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
                console.log(lockerOptions)
            })
            .catch((error) => {
                console.error("Error while loading locker options", error);
            });
    };

    useEffect(() => {
        loadLockerOptions();
    }, []);

    const calculatePrice = () => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the senderLocker and receiverLocker are the same
        if (formData.senderLocker === formData.receiverLocker) {
            console.error("Sender locker and receiver locker cannot be the same");
            // You can also display an error message to the user
            return;
        }

        // Create a JSON object to send to the server
        const requestData = {
            SenderLockerId: formData.senderLocker,
            DestinationLockerId: formData.receiverLocker,
            receiverName: formData.receiverName,
            receiverEmail: formData.receiverEmail,
            packageSize: formData.packageSize,
            isRapid: formData.isRapid,
            note: formData.note,
            userId: formData.userId
        };

        // Call the dispatch method from UserDataService to send the data to the server
        PackageDataService.new(requestData, localStorage.getItem("token"))
            .then((response) => {
                // Handle success or navigation to another page
                console.log("Package dispatched successfully");
            })
            .catch((error) => {
                console.error("Error while dispatching the package", error);
            });
    };

    if (!isLoggedIn) {
        return (
            <div className="container">
                <p>Please log in to access this feature.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Send Package</h1>
            <p>User's Email: { localStorage.getItem("email") }</p>
            <p>User's Name: { localStorage.getItem("name") }</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="senderLocker" className="form-label">Sender Locker</label>
                    <select
                        name="senderLocker"
                        className="form-select"
                        value={formData.senderLocker}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Sender Locker</option>
                        {lockerOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="receiverLocker" className="form-label">Receiver Locker</label>
                    <select
                        name="receiverLocker"
                        className="form-select"
                        value={formData.receiverLocker}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Receiver Locker</option>
                        {lockerOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="receiverName" className="form-label">Receiver Name</label>
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
                    <label htmlFor="receiverEmail" className="form-label">Receiver Email</label>
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
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="packageSize"
                                value="small"
                                checked={formData.packageSize === "small"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label">Small</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="packageSize"
                                value="medium"
                                checked={formData.packageSize === "medium"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="packageSize"
                                value="large"
                                checked={formData.packageSize === "large"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label">Large</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Note</label>
                    <textarea
                        className="form-control"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="acceptTerms"
                        checked={formData.isRapid} // Use checked attribute instead of value
                        onChange={() => {
                            // Toggle the value of formData.isRapid when the checkbox is clicked
                            setFormData({
                                ...formData,
                                isRapid: !formData.isRapid,
                            });
                        }}
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">Rapid delivery</label>
                </div>

                <button type="submit" className="btn btn-primary">Dispatch</button>
            </form>
        </div>
    );
};

export default Dispatch;