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

  const fetchCoordinates = async (Address) => {
    try {
      const apiUrl = `https://geocode.maps.co/search?q=${Address}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates. Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { Latitude: lat, Longitude: lon };
      } else {
        throw new Error("No coordinates found for the given Address.");
      }
    } catch (error) {
      console.error("Error while fetching coordinates:", error);
      throw error;
    }
  };

  const [formData, setFormData] = useState({
    City: "",
    Address: "",
    Latitude: 0,
    Longitude: 0,
    Capacity: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullAddress = formData.City + " " + formData.Address;
    try {
      const coordinates = await fetchCoordinates(fullAddress);
  
      formData.Latitude = coordinates.Latitude;
      formData.Longitude = coordinates.Longitude;

      formData.Capacity = parseInt(formData.Capacity);
      formData.Latitude = parseFloat(formData.Latitude);
      formData.Longitude = parseFloat(formData.Longitude);
        
      // Do not allow higher Capacity than 100
      if (formData.Capacity > 100) {
        setError("Capacity cannot be higher than 100.");
        return;
      } else {
        setError(null);
      }
  
      if (!formData.City || !formData.Address || formData.Capacity <= 0) {
        setError("Please fill in all required fields.");
        return;
      } else {
        setError(null); 
      }
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
            { id: "City", label: "City", type: "text" },
            { id: "Address", label: "Address", type: "text" },
            { id: "Capacity", label: "Capacity", type: "number" },
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
