import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

        return () => clearTimeout(loadingTimeout);
    }, [id]);

    if (isLoading) {
        return <Loading className="loading" />;
    }

    const deliveryDate = new Date(packageData.Data.DeliveryDate);
    const dayOfWeek = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
                    <div key={index} className="state-images">
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
                    <td className="package-table-info">{packageData.Data.ID}</td>
                </tr>
                <tr>
                    <td className="package-table-title">Size:</td>
                    <td className="package-table-info">{packageData.Data.Size}</td>
                </tr>
                <tr>
                    <td className="package-table-title">Price:</td>
                    <td className="package-table-info">{packageData.Data.Price}</td>
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
