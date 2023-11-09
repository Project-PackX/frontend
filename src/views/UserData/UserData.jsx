import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import UserDataService from "../../services/user";
import decode from "jwt-decode";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";
import { useNavigate } from "react-router-dom";
import "./userdata.css";

export const UserData = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const isAlphaNumeric = (input) => /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s.,/-]*$/.test(input);
  const isAddressValid = (address) => /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s.,/-]*$/.test(address);
  const isEmailValid = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email.split("@").length === 2 && email.split(".").length >= 2;
  const isPhoneNumberValid = (phone) => /^[0-9+]{1,15}$/.test(phone);

  useEffect(() => {
    if (isLoggedIn) {
      setFormData({
        name: localStorage.getItem("name"),
        address: localStorage.getItem("address"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
      });
    }
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }

    for (const input of [
      { id: "name", label: "Name", validator: isAlphaNumeric },
      { id: "address", label: "Address", validator: isAddressValid },
      { id: "email", label: "Email", validator: isEmailValid },
      { id: "phone", label: "Phone", validator: isPhoneNumberValid },
    ]) {
      if (formData[input.id] && !input.validator(formData[input.id])) {
        alert(`Please enter valid information to the: "${input.label}" field`);
        return;
      }
    }

    const updatedUserData = {
      Name: formData.name,
      Address: formData.address,
      Phone: formData.phone,
      Email: formData.email,
    };
    const token = localStorage.getItem("token");
    const userId = decode(token).user_id;

    UserDataService.updateUser(userId, token, updatedUserData)
      .then((response) => {
        console.log("User data updated successfully", response.data);
        ["Name", "Address", "Phone", "Email"].forEach((field) => {
          localStorage.setItem(field, response.data[field]);
        });
        localStorage.setItem("name", formData.name);
        localStorage.setItem("address", formData.address);
        localStorage.setItem("phone", formData.phone);
        localStorage.setItem("email", formData.email);
        navigate("/successfulresponse", { state: { referrer: "userdata" } });
      })
      .catch((error) => {
        setError("Error updating user data. Please try again.");
        console.error("Update user data error:", error);
      });
  };

  if (!isLoggedIn) {
    return <NoPermission />;
  }

  return (
    <div className="userdata container row col-12">
      <div className="userdata-form-container col-md-6 mt-5">
        <h1 className="userdata-title">Edit Your User Data</h1>
        <p className="delete-subtitle">Here you can modify your account information.</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {["name", "address", "phone"].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="userdata-form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input type="text" className="userdata-form-input" name={field} value={formData[field]} onChange={handleInputChange} />
            </div>
          ))}
          <ReCaptchaWidget onRecaptchaChange={setIsRecaptchaVerified} />
          <button type="submit" className="userdata-btn">
            Save
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img className="image" src="/assets/images/undraw_private_data_re_4eab.svg" alt="user-data" />
      </div>
    </div>
  );
};
