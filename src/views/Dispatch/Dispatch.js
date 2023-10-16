import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import UserDataService from '../../services/user';
import LockerDataService from '../../services/locker';

const Dispatch = () => {
    const { isLoggedIn } = useAuth();

    const [lockerOptions, setLockerOptions] = useState([]);
    const [formData, setFormData] = useState({
        senderLocker: '',
        receiverLocker: '',
        receiverName: '',
        receiverEmail: '',
        packageSize: 'small',
        note: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loadLockerOptions = async () => {
        try {
            const lockers = await LockerDataService.getAll();
            const lockerOptions = lockers.map((locker) => ({
                value: locker.id,
                label: `${locker.city} - ${locker.address}`,
            }));
            setLockerOptions(lockerOptions);
        } catch (error) {
            console.error("Error while loading locker options", error);
        }
    };

    useEffect(() => {
        loadLockerOptions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a JSON object to send to the server
        const requestData = {
            senderLocker: formData.senderLocker,
            receiverLocker: formData.receiverLocker,
            receiverName: formData.receiverName,
            receiverEmail: formData.receiverEmail,
            packageSize: formData.packageSize,
            note: formData.note,
        };

        // Call the dispatch method from UserDataService to send the data to the server
        UserDataService.dispatch(requestData)
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
            <p>User's Email: {isLoggedIn.email}</p>
            <p>User's Name: {isLoggedIn.name}</p>

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
                            <option key={option.value} value={option.value}>
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
                            <option key={option.value} value={option.value}>
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

                <button type="submit" className="btn btn-primary">Dispatch</button>
            </form>
        </div>
    );
};

export default Dispatch;
