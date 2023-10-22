import React, { useState, useEffect } from 'react';
import LockerDataService from '../../services/locker';
import './contact.css';

const Contact = () => {   

    return (
        <>


            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Management warehouse</h2>
                    <p className="data" >Hungary - Győr-Moson-Sopron - 9028 Győr, Tibormajori Utca 70 </p>
                    <p className="data" >+36 20 123 45 67 </p>
                    <p className="data" >info@packx.hu </p>
                </div>
                <div className="content-right">
                <iframe
                            title="Warehouse location"
                            width="1000"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=47.6804636,17.7461013&hl=es&z=14&output=embed`}
                        />
                </div>
            </div>
            <div className="seperator-line"></div>

        </>
    );
};

export default Contact;
