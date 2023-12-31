import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PackageDataService from '../../services/package.js';
import { Loading } from '../../components/Loading/Loading.jsx';
import './package-status.css';

import DispatchSvg from '/assets/images/undraw_data_processing_yrrv.svg';
import TransitSvg from '/assets/images/undraw_aircraft_re_m05i.svg';
import InWarehouseSvg from '/assets/images/undraw_building_re_xfcm.svg';
import InDeliverySvg from '/assets/images/undraw_delivery_truck_vt6p.svg';
import DeliveredSvg from '/assets/images/undraw_order_delivered_re_v4ab.svg';

export const PackageStatus = () => {
    const [packageData, setPackageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
    const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "HUF");

    useEffect(() => {
        localStorage.setItem('selectedCurrency', selectedCurrency);
    }, [selectedCurrency]);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        localStorage.setItem('selectedCurrency', currency);
    };

    const getPackageStatus = (id) => {
        PackageDataService.get(id)
            .then((response) => setPackageData(response.data))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);
        getPackageStatus(id);
        return () => clearTimeout(loadingTimeout);
    }, [id]);

    if (isLoading) return <Loading className="loading" />

    if (!packageData) {
        return (
            <div className="container send-container">
                <div className="send-box">
                    <h2>Package Not Found</h2>
                    <p>Sorry, we couldn't find a package with that ID.</p>
                    <Link to="/track" className="btn login-btn">Track another package</Link>
                </div>
            </div>
        );
    }

    const deliveryDate = new Date(packageData.Data.DeliveryDate);
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const hufPrice = packageData.Data.Price;
    const eurPrice = (hufPrice * exchangeRates.EUR).toFixed(2);
    const usdPrice = (hufPrice * exchangeRates.USD).toFixed(2);

    const stages = ['Dispatch', 'Transit', 'In Warehouse', 'In Delivery', 'Delivered'];
    const currentState = packageData.Status;

    const getSvgForStage = (stage) => {
        const svgMap = {
            'Dispatch': DispatchSvg,
            'Transit': TransitSvg,
            'In Warehouse': InWarehouseSvg,
            'In Delivery': InDeliverySvg,
            'Delivered': DeliveredSvg,
        };

        return svgMap[stage];
    };

    return (
        <div className="package-details container">
            <h2>{packageData.Status}</h2>
            <h3>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            <div className="dropdown text-end">
                <button className="button button-primary dropdown-toggle currency-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedCurrency}
                </button>
                <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
                    <li><a className="dropdown-item" onClick={() => handleCurrencyChange('HUF')}>HUF</a></li>
                    <li><a className="dropdown-item" onClick={() => handleCurrencyChange('EUR')}>EUR</a></li>
                    <li><a className="dropdown-item" onClick={() => handleCurrencyChange('USD')}>USD</a></li>
                </ul>
            </div>
            <div className="timeline">
                {stages.map((stage, index) => (
                    <div
                        key={index}
                        className={`state-images ${stage === currentState ? 'current' : ''}`}
                    >
                        <img
                            src={getSvgForStage(stage)}
                            alt={stage}
                            className="state-image"
                            style={{
                                filter: index <= stages.indexOf(currentState) ? 'none' : 'grayscale(100%)',
                            }}
                        />
                        <p className="stage-name">{stage}</p>
                    </div>
                ))}
            </div>
            <table className="package-table">
                <tbody>
                    <tr>
                        <td className="package-table-title">Tracking number:</td>
                        <td className="package-table-info">{packageData.Data.TrackID}</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Size:</td>
                        <td className="package-table-info">{packageData.Data.Size}</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Price:</td>
                        <td className="package-table-info">{selectedCurrency === 'HUF' ? `${hufPrice} HUF` : selectedCurrency === 'EUR' ? `${eurPrice} EUR` : `${usdPrice} USD`}</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Est. delivery date:</td>
                        <td className="package-table-info">{formattedDate}</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">CO2 savings:</td>
                        <td className="package-table-info"> {packageData.Data.Co2.toFixed(2)} kg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};