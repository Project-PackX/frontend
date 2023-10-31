import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PackageDataService from '../../services/package.js';
import { Loading } from '../../components/Loading/Loading.js';
import './package-status.css';

// Import your SVGs here (replace these with your SVGs)
import DispatchSvg from '../../assets/images/undraw_data_processing_yrrv.svg';
import TransitSvg from '../../assets/images/undraw_aircraft_re_m05i.svg';
import InWarehouseSvg from '../../assets/images/undraw_building_re_xfcm.svg';
import InDeliverySvg from '../../assets/images/undraw_delivery_truck_vt6p.svg';
import DeliveredSvg from '../../assets/images/undraw_order_delivered_re_v4ab.svg';

export const PackageStatus = () => {
    const [packageData, setPackageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [exchangeRates, setExchangeRates] = useState(null); // State for exchange rates

    const getPackageStatus = (id) => {
        PackageDataService.get(id)
            .then((response) => {
                setPackageData(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        getPackageStatus(id);

        // Fetch exchange rates when the component mounts
        fetchExchangeRates();

        return () => clearTimeout(loadingTimeout);
    }, [id]);

    // Function to fetch exchange rates
    const fetchExchangeRates = () => {
        fetch('https://open.er-api.com/v6/latest/HUF')
            .then((response) => response.json())
            .then((data) => {
                setExchangeRates(data.rates);
            })
            .catch((error) => {
                console.error("Error while fetching exchange rates", error);
            });
    };

    if (isLoading) {
        return <Loading className="loading" />;
    }

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

    // Calculate prices in different currencies
    const deliveryDate = new Date(packageData.Data.DeliveryDate);
    const dayOfWeek = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
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
            <h3>{`${dayOfWeek}, ${formattedDate}`}</h3>
            <div className="timeline">
                {stages.map((stage, index) => (
                    <div key={index} className="state-images" style={{
                        border: index === stages.indexOf(currentState) ? '2px solid var(--purple)' : '2px solid var(--gray)'
                    }}>
                        {/* Render the SVG for the current stage and apply color conditionally */}
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
                        <td className="package-table-title">Price (HUF):</td>
                        <td className="package-table-info">{hufPrice} HUF</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Price (EUR):</td>
                        <td className="package-table-info">{eurPrice} EUR</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Price (USD):</td>
                        <td className="package-table-info">{usdPrice} USD</td>
                    </tr>
                    <tr>
                        <td className="package-table-title">Est. delivery date:</td>
                        <td className="package-table-info">{formattedDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
