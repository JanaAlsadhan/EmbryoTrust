import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import axios from "axios";
import { BACKEND_URL } from "../constant/index";


const UpdatePassword = () => {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confrimPassword: "",
  });
 


  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
  
    if (formData.password !== formData.confrimPassword) {
      setError("New passwords do not match!");
      return;
    }
  
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("Unauthorized: No token found.");
      return;
    }
    
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/patient/updatingpassword`,
        {
          currentPassword: formData.currentPassword,
          password: formData.password,
          confrimPassword: formData.confrimPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      setMessage("Your password has been updated successfully.");
      setTimeout(() => {
        navigate("/patient-info");
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };
  

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      <div className="absolute left-0 bottom-0 z-10 w-full bg-color flex justify-center items-center h-[80px] px-4">
        <p className="text-white text-center w-full font-lock font-semibold text-sm md:text-lg">
          Update your password securely
        </p>
      </div>
      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52" src={logo} alt="Logo" />
      </Link>
      <div className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 border border-[#480CBF] bg-white rounded-3xl">
        <h1 className="text-2xl text-[#480CBF] text-center mb-4">Update Password</h1>
        {['currentPassword', 'password', 'confrimPassword'].map((field, index) => (
          <div key={index} className="relative w-full mt-4">
            <input
              type={showPasswords[field] ? "text" : "password"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full bg-[#F5F0FF] p-2 text-[#480CBF] rounded-2xl pr-10"
              placeholder={
                field === "currentPassword" ? "Enter current password" :
                field === "password" ? "Enter new password" :
                "Confirm new password"
              }
            />
            <button
              type="button"
              onClick={() => toggleVisibility(field)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#480CBF]"
            >
              {showPasswords[field] ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        ))}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}
        <button
          onClick={handleSubmit}
          className="w-full md:w-[170px] mt-6 bg-[#480CBF] text-white p-2 rounded-xl hover:scale-105 transition-transform duration-300"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;