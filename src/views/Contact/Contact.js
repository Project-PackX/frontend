import React, { useState, useEffect } from 'react';
import LockerDataService from '../../services/locker';
import './contact.css';

const Contact = () => {   

    return (
        <>
            <div className="features row col-12">
                <div className="contact-data-container">
                <div className="feature col-md-6">
                    <h1 className="contact-title">Management warehouse</h1>
                    <h2 className="contact-data">Hungary - Győr-Moson-Sopron - 9028 Győr, Tibormajori Utca 70</h2>
                    <h2 className="contact-data">
                        <a href="tel:+36201234567">+36 20 123 45 67</a>
                    </h2>
                    <h2 className="contact-data">
                        <a href="mailto:info@packx.hu">info@packx.hu</a>
                    </h2>
                    </div>
                    <div className="feature col-md-6">
                        <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                        <iframe
                                contact-title="Warehouse location"
                                width="800rem" 
                                height="500rem" 
                                style={{ border: 0 }}
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=47.6804636,17.7461013&hl=en&z=14&output=embed`}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
