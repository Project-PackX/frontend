import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../../../services/user";
import "../../Register/register.css";
import {useAuth} from "../../../context/auth";
import {NoPermission} from "../../../components/Slave/NoPermission/NoPermission";

export const AdminAddUser = () => {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();
    const access_level = parseInt(localStorage.getItem("access_level"));

    // Error handling
    const ErrorMessage = ({ message }) => (
        <div className="setError setError-danger">{message}</div>
    );
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const input of [
            { id: "name", label: "Name" },
            { id: "address", label: "Address" },
            { id: "email", label: "Email" },
            { id: "phone", label: "Phone" },
        ]) {
            if (formData[input.id].trim() === "") {
                setError(<ErrorMessage message={'Please enter information to the "${input.label}" field'} />);
                return;
            }
        }

        const requestData = {
            Name: formData.name,
            Address: formData.address,
            Phone: formData.phone,
            Email: formData.email,
            Password: formData.password,
        };

        UserDataService.register(requestData)
            .then((response) => {
                console.log("User registered successfully", response.data);
                navigate("/admin-users", { state: { referrer: "register" } });
            })
            .catch((error) => {
                console.error("Error while registering the user", error);
            });
    };

    if (!isLoggedIn || access_level !== 3) {
        return <NoPermission />;
    }

    return (
        <div className="userdata container row col-12">
            <div className="userdata-form-container col-md-6 mt-5">
                <h1 className="register-title">Add user</h1>
                <p className="register-subtitle">Please enter the details</p>
                <form onSubmit={handleSubmit}>
                    {[
                        { id: "name", label: "Name", type: "text" },
                        { id: "address", label: "Address", type: "text" },
                        { id: "phone", label: "Phone", type: "text" },
                        { id: "email", label: "Email", type: "email" },
                        { id: "password", label: "Password", type: "password" },
                    ].map((input) => (
                        <div key={input.id} className="mb-3">
                            <label htmlFor={input.id} className="register-form-label">
                                {input.label}
                            </label>
                            <input
                                type={input.type}
                                className="register-form-input"
                                id={input.id}
                                value={formData[input.id]}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit" className="register-btn">
                        Add user
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img src="/assets/images/undraw_people_re_8spw.svg" alt="user-data" className="image" />
            </div>
        </div>
    );
};
