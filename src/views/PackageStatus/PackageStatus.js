import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PackageDataService from "../../services/package.js";

import loader from '../../assets/loading/loading_trans.gif';
import './package-status.css';

export const PackageStatus = () => {

    const [packageData, setPackageData] = useState(null)
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const { id } = useParams()

    const getPackageStatus = id => {
        PackageDataService.get(id)
            .then(response => {
                setPackageData(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        // Delay the loading completion by 2 seconds
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        getPackageStatus(id);

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(loadingTimeout);
    }, [id]);

    if (isLoading) {
        return <img src={loader} alt="loading..." />;
    }

    const deliveryDate = new Date(packageData.Data.DeliveryDate);
    const dayOfWeek = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const stages = ['Dispatch', 'Transit', 'In Warehouse', 'In Delivery', 'Delivered'];
    const currentState = packageData.Status;

    const getDotColor = (stageIndex) => {
        return stageIndex <= stages.indexOf(currentState) ? 'green-dot' : 'gray-dot';
    };

    return (
        <div className="package-details container">
            <h2>{packageData.Status}</h2>
            <h3>{`${dayOfWeek}, ${formattedDate}`}</h3>
            <div className="timeline">
                {stages.map((stage, index) => (
                    <div key={index} className={`dot ${getDotColor(index)}`}>
                        <p className='stage-name'>{stage}</p>
                    </div>
                ))}
            </div>
            <table className='package-table'>
                <tbody>
                <tr>
                    <td className='package-table-title'>Tracking number:</td>
                    <td className='package-table-info'>{packageData.Data.ID}</td>
                </tr>
                <tr>
                    <td className='package-table-title'>Size:</td>
                    <td className='package-table-info'>{packageData.Data.Size}</td>
                </tr>
                <tr>
                    <td className='package-table-title'>Price:</td>
                    <td className='package-table-info'>{packageData.Data.Price}</td>
                </tr>
                <tr>
                    <td className='package-table-title'>Est. delivery date:</td>
                    <td className='package-table-info'>{formattedDate}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};
