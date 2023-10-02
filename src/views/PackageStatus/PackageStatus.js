import React from 'react';

import './package-status.css';

export const PackageStatus = ({ packageData }) => {
    const deliveryDate = new Date(packageData.Data.DeliveryDate);
    const dayOfWeek = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Define the 5 stages and the current state
    const stages = ['Dispatch', 'Transit', 'In Warehouse', 'In Delivery', 'Delivered'];
    const currentState = packageData.Status;

    // Create a function to determine the color of the dots
    const getDotColor = (stageIndex) => {
        return stageIndex <= stages.indexOf(currentState) ? 'green-dot' : 'gray-dot';
    };

    return (
        <div className="package-details">
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
