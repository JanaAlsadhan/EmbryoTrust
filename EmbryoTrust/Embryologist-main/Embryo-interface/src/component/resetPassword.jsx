import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confrimPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (formData.password !== formData.confrimPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.patch(`${BACKEND_URL}/doctor/resetpassword/${token}`, {
        password: formData.password,
        confrimPassword: formData.confrimPassword,
      });

      if (response.data) {
        setMessage("Your password has been reset successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52 lg:w-[250px]" src={logo} alt="Logo" />
      </Link>

      <div className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 lg:p-16 border border-[#480CBF] bg-white rounded-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] text-[#480CBF] text-center">
          Reset Password
        </h1>

        {/* Password Input */}
        <div className="relative flex items-center mt-5">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-[#480CBF]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative flex items-center mt-5">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confrimPassword"
            value={formData.confrimPassword}
            onChange={handleChange}
            className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 text-[#480CBF]"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}

        <button
          onClick={handleSubmit}
          className="w-full md:w-[170px] mt-6 shadow-lg hover:scale-105 transition-transform duration-300 text-white bg-[#480CBF] p-2 rounded-xl"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
