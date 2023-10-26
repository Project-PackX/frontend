import React from 'react';
import './contact.css';

export const Contact = () => {

    return (
        <>  
            <div className="features row col-12">
            <div className="contact-data-container">
                <div className="feature contact-data col-md-6" >
                    <h1 className="contact-title">Management warehouse</h1>
                    <h1 className="contact-subtitle">Hungary - Győr-Moson-Sopron - 9028 Győr, Tibormajori Utca 70</h1>
                    <h2>
                        <a href="tel:+36201234567">+36 20 123 45 67</a>
                    </h2>
                    <h2>
                        <a href="mailto:info@packx.hu">info@packx.hu</a>
                    </h2>
                    <img
                    className="contact-ware-image"
                    src={require("../../assets/images/undraw_logistics_x-4-dc.svg").default}
                    alt="warehouse"
                    />
                    </div>
                    <div className="feature col-md-6">
                        <div className='contact-map'>
                        <iframe
                                contact-title="Warehouse location"
                                width="800rem" 
                                height="500rem" 
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