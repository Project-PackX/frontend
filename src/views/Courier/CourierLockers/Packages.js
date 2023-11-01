import {useParams} from "react-router-dom";
import LockerDataService from "../../../services/locker";
import {useEffect, useState} from "react";

export const Packages = () => {

    const { id } = useParams();
    const [packages, setPackages] = useState([]);
    const token = localStorage.getItem('token');

    const getLockerPackages = () => {
        LockerDataService.getPackages(id, token)
            .then((response) => {
                console.log(response.data.Message);
                setPackages(response.data.Message)
            })
            .catch((error) => {
                console.error("Error while loading locker packages", error);
            });
    }

    useEffect(() => {
        getLockerPackages();
    }, []);

    return (
        <div>
            <h1>Packages</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Track ID</th>
                        <th>Sender Locker</th>
                        <th>Receiver Locker</th>
                        <th>Price</th>
                        <th>Delivery Date</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((item) => (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.TrackID}</td>
                            <td>{item.SenderLocker}</td>
                            <td>{item.ReceiverLocker}</td>
                            <td>{item.Price}</td>
                            <td>{item.DeliveryDate}</td>
                            <td>{item.Note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}