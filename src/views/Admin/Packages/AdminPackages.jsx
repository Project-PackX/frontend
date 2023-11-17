import { useState, useEffect } from "react";
import "./admin-packages.css";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import { useAuth } from "../../../context/auth";
import PackageDataService from "../../../services/package";
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to include Bootstrap CSS

export const AdminPackages = () => {
    const { isLoggedIn } = useAuth();
    const access_level = parseInt(localStorage.getItem("access_level"));
    const token = localStorage.getItem("token");

    const [packages, setPackages] = useState([]);
    console.log(packages)

    useEffect(() => {
        if (isLoggedIn && access_level === 3) {
            // Fetch packages when the component mounts
            fetchPackages().then(r => console.log(r));
        }
    }, [isLoggedIn, access_level]);

    const fetchPackages = async () => {
        try {
            const response = await PackageDataService.getAll(token);
            setPackages(response.data.Csomagok.map(pkg => ({
                ...pkg,
                DeliveryDate: new Date(pkg.DeliveryDate).toLocaleString() || "N/A",
                Co2: parseFloat(pkg.Co2).toFixed(2)
            })));
        } catch (error) {
            console.error("Error while loading packages", error);
        }
    };

    if (!isLoggedIn || access_level !== 3) {
        return <NoPermission />;
    }

    return (
        <div className="container mt-5">
            <h1>Admin Packages</h1>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Sender Locker ID</th>
                    <th>Destination Locker ID</th>
                    <th>Receiver Name</th>
                    <th>Receiver Email</th>
                    <th>Size</th>
                    <th>Delivery Speed</th>
                    <th>Price</th>
                    <th>Delivery Date</th>
                    <th>Co2</th>
                    <th>Note</th>
                    <th>Courier ID</th>
                    {/* Add other columns as needed */}
                </tr>
                </thead>
                <tbody>
                {packages.map((pkg) => (
                    <tr key={pkg.ID}>
                        <td>{pkg.ID}</td>
                        <td>{pkg.SenderLockerId}</td>
                        <td>{pkg.DestinationLockerId}</td>
                        <td>{pkg.ReceiverName}</td>
                        <td>{pkg.ReceiverEmail}</td>
                        <td>{pkg.Size}</td>
                        <td>{pkg.DeliverySpeed}</td>
                        <td>{pkg.Price}</td>
                        <td>{pkg.DeliveryDate}</td>
                        <td>{pkg.Co2}</td>
                        <td>{pkg.Note}</td>
                        <td>{pkg.CourierID}</td>
                        {/* Add other cells as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
