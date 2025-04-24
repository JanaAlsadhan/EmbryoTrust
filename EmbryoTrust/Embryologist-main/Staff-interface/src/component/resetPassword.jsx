import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import logo from "../assets/logo.png";
import axios from "axios";
import { BACKEND_URL } from "../constant/index";

const ResetPassword = () => {
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
      const response = await axios.patch(`${BACKEND_URL}/resetpassword/${token}`, {
        password: formData.password,
        confrimPassword: formData.confrimPassword,
      });

      if (response.data) {
        setMessage("Your password has been reset successfully.");
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      {/* Bottom Banner */}
      <div className="absolute left-0 bottom-0 z-10 w-full bg-color flex justify-center items-center h-[80px] px-4">
        <p className="text-white text-center w-full font-lock font-semibold text-sm md:text-lg leading-[22px]">
          Enter your new password to reset your account
        </p>
      </div>

      {/* Logo */}
      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52 lg:w-[250px]" src={logo} alt="Logo" />
      </Link>

      {/* Reset Password Box */}
      <div className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 lg:p-16 border border-[#480CBF] bg-white rounded-3xl">
        {/* Title Box */}
        <div className="absolute -top-5 left-5 md:left-8 bg-white border border-[#480CBF] p-2 rounded-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#480CBF]">
            Reset Password
          </h1>
        </div>

        {/* Password Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5 relative">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg md:w-[130px] md:h-[55px] text-sm md:text-lg font-inter text-[#480CBF] rounded-xl">
            Password
          </button>
          <div className="relative w-full md:w-[70%]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#480CBF]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5 relative">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg md:w-[130px] md:h-[55px] text-sm md:text-lg font-inter text-[#480CBF] rounded-xl">
            Confirm
          </button>
          <div className="relative w-full md:w-[70%]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confrimPassword"
              value={formData.confrimPassword}
              onChange={handleChange}
              className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base pr-10"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#480CBF]"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}

        {/* Submit Button */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleSubmit}
            className="w-full md:w-[170px] text-center shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 text-white text-sm md:text-lg leading-[24px] bg-[#480CBF] p-2 md:p-3 rounded-xl"
          >
            Reset Password
          </button>
        </div>

        {/* Back to Login */}
        <div className="flex justify-center items-center mt-4">
          <Link to="/login" className="text-green-600 text-sm md:text-base hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
