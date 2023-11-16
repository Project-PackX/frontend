import { useState, useEffect } from 'react';
import "./admin-users.css";
import UserDatService from "../../../services/user";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {NoPermission} from "../../../components/Slave/NoPermission/NoPermission";
import {useAuth} from "../../../context/auth"; // Make sure to include Bootstrap CSS

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const access_level = parseInt(localStorage.getItem("access_level"));

    const { isLoggedIn } = useAuth();

    // get all user
    const getAllUsers = async () => {
        try {
            const response = await UserDatService.getAll();
            setUsers(response.data);
        } catch (error) {
            console.error("Error while loading users", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Determine user permission based on email
    const getUserPermission = (email) => {
        if (email.endsWith('packx.hu')) {
            return 'Admin';
        } else if (email.endsWith('packx-courier.hu')) {
            return 'Courier';
        } else {
            return 'Normal User';
        }
    };

    if (!isLoggedIn || access_level !== 3) {
        return <NoPermission />;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Admin Users</h1>
                <Link to="/add-new-user" className="btn submit-btn">
                    Add User
                </Link>
            </div>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Permission</th>
                    {/* Add other columns as needed */}
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.ID}>
                        <td>{user.ID}</td>
                        <td>{user.Name}</td>
                        <td>{user.Address}</td>
                        <td>{user.Phone}</td>
                        <td>{user.Email}</td>
                        <td>{getUserPermission(user.Email)}</td>
                        {/* Add other cells as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
