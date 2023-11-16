import { useState, useEffect } from 'react';
import "./admin-users.css";
import UserDatService from "../../../services/user";
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to include Bootstrap CSS

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

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
            return 'User';
        }
    };

    return (
        <div className="container mt-5">
            <h1>Admin Users</h1>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Permission</th> {/* New column for Permission */}
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
                        <td>{getUserPermission(user.Email)}</td> {/* Display Permission based on email */}
                        {/* Add other cells as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
