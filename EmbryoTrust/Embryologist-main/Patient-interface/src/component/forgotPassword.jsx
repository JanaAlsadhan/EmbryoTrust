import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { BACKEND_URL } from "../../src/constant/index";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      // Make API call to request password reset
      const response = await axios.post(`${BACKEND_URL}/patient/forgetpassword`, { email });

      if (response.data) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      {/* Bottom Banner */}
      <div className="absolute left-0 bottom-0 z-10 w-full bg-color flex justify-center items-center h-[80px] px-4">
        <p className="text-white text-center w-full font-lock font-semibold text-sm md:text-lg leading-[22px]">
          You Must Be Registered In The Hospital Information System To Reset Password
        </p>
      </div>

      {/* Logo */}
      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52 lg:w-[250px]" src={logo} alt="Logo" />
      </Link>

      {/* Forgot Password Box */}
      <div className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 lg:p-16 border border-[#480CBF] bg-white rounded-3xl">
        {/* Welcome Box */}
        <div className="absolute -top-5 left-5 md:left-8 bg-white border border-[#480CBF] p-2 rounded-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#480CBF]">
            Forgot Password
          </h1>
        </div>

        {/* Email Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg p-2 md:w-[130px] md:h-[55px] text-sm md:text-lg font-inter text-[#480CBF] rounded-xl">
            Email
          </button>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[70%] bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
            placeholder="Enter your email"
          />
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

export default ForgotPassword;
