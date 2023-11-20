import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locker.css';

export const Locker = () => {
    const [enteredNumbers, setEnteredNumbers] = useState('');

    const handleNumberClick = (number) => {
        setEnteredNumbers((prevNumbers) => prevNumbers + number);
    };

    const handleClear = () => {
        setEnteredNumbers('');
    };

    const handleEnter = () => {
        console.log('Enter pressed. Do something with entered numbers:', enteredNumbers);
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <div className="keypad-container">
                    <div className="entered-numbers-container">
                        <div className="entered-numbers btn-custom">{enteredNumbers}</div>
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
            </div>
        </div>
    );
};
