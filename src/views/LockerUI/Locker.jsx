import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locker.css';
import PackageDataService from '../../services/package';

export const Locker = () => {
    const [enteredNumbers, setEnteredNumbers] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const handleNumberClick = (number) => {
        setEnteredNumbers((prevNumbers) => prevNumbers + number);
    };

    const handleClear = () => {
        setEnteredNumbers('');
        setResponseStatus(null);
        setResponseData(null);
    };

    const handleEnter = () => {
        PackageDataService.getPackageByLockerCode(enteredNumbers.toString())
            .then((response) => {
                setResponseStatus('success');
                setResponseData(response.data);
            })
            .catch((error) => {
                setResponseStatus('error');
                setResponseData(null);
            });
    };

    const renderContent = () => {
        if (responseStatus === 'success') {
            return (
                <div>
                    <div className="success-container">
                        <p className="success-text">Data successfully retrieved:</p>
                        <div className="package-data">
                            <p>Track ID: {responseData.data.TrackID}</p>
                            <p>Receiver name: {responseData.data.ReceiverName}</p>
                            <p>Receiver email: {responseData.data.ReceiverEmail}</p>
                            <p>Size: {responseData.data.Size}</p>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleClear}>
                        Return
                    </button>
                </div>
            );
        } else if (responseStatus === 'error') {
            return (
                <div className="error-container">
                    <p className="error-text">Error retrieving data. Please try again.</p>
                    <button className="btn btn-primary mt-3" onClick={handleClear}>
                        Return
                    </button>
                </div>
            );
        } else {
            return (
                <div className="keypad-container">
                    <div className="entered-numbers-container mb-5">
                        <div className="entered-numbers">{enteredNumbers}</div>
                    </div>
                    <div className="keypad">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 0, 9].map((number) => (
                            <button
                                key={number}
                                className={`btn btn-outline-secondary btn-custom m-2 ${number === 0 ? 'zero-button' : ''}`}
                                onClick={() => handleNumberClick(number)}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            className="btn btn-outline-danger btn-custom m-2"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                        <button
                            className="btn btn-outline-primary btn-custom m-2"
                            onClick={handleEnter}
                        >
                            Enter
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                {renderContent()}
            </div>
        </div>
    );
};
