import { useState } from "react";
import { useAuth } from "../../../context/auth";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import LockerDataService from "../../../services/locker";
import { useNavigate } from "react-router-dom";

export const AddLocker = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const accessLevel = parseInt(localStorage.getItem("access_level"));
  const token = localStorage.getItem("token");

  // Error handling
  const ErrorMessage = ({ message }) => (
    <div className="alert alert-danger">{message}</div>
  );
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    city: "",
    address: "",
    latitude: 0,
    longitude: 0,
    capacity: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do not allow higher capacity than 100
    if (formData.capacity > 100) {
      setError("Capacity cannot be higher than 100.");
      return;
    } else {
      setError(null); // Clear the error if capacity is within limits
    }

    // Validate form data (you can add more validation as needed)
    if (!formData.city || !formData.address || formData.capacity <= 0) {
      setError("Please fill in all required fields.");
      return;
    } else {
        setError(null); // Clear the error if all fields are filled
    }

    try {
      // Call the service to add a locker
      const response = await LockerDataService.addLocker(formData, token);

      // Handle the response as needed
      console.log("Locker added successfully", response.data);
      navigate("/admin-lockers", { state: { referrer: "add-locker" } });

      // Optionally, redirect or perform other actions after successful submission
    } catch (error) {
      console.error("Error adding locker", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  // Permission check
  if (!isLoggedIn || accessLevel !== 3) {
    return <NoPermission />;
  }

  return (
    <div className="userdata container row col-12">
      <div className="userdata-form-container col-md-6 mt-5">
        <h1 className="register-title">Add Locker</h1>
        <p className="register-subtitle">Please enter the details</p>
        {error && <ErrorMessage message={error} />} {/* Render error message if exists */}
        <form onSubmit={handleSubmit}>
          {[
            { id: "city", label: "City", type: "text" },
            { id: "address", label: "Address", type: "text" },
            { id: "capacity", label: "Capacity", type: "number" },
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
                onChange={(e) =>
                  setFormData({ ...formData, [input.id]: e.target.value })
                }
                required
              />
            </div>
          ))}
          <button type="submit" className="register-btn">
            Add Locker
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img
          src="/assets/images/undraw_progress_indicator_re_4o4n.svg"
          alt="user-data"
          className="image"
        />
      </div>
    </div>
  );
};
