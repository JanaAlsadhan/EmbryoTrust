import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import StatesContext from "../../context/StatesContext";

const Login = () => {
  const navigate = useNavigate();
  const { patientlogin } = useContext(StatesContext); // Get login function from context

  const [formData, setFormData] = useState({
    patientId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await patientlogin(formData); // Call login function
    if (response.success) {
      navigate("/patient-info"); // Redirect on success
    } else {
      setError(response.error); // Display error message
    }
  };

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      {/* Bottom Banner */}
      <div className="absolute left-0 bottom-0 z-10 w-full bg-color flex justify-center items-center h-[80px] px-4">
        <p className="text-white text-center w-full font-lock font-semibold text-xs md:text-base leading-[20px]">
          You Must Be Registered In The Hospital Information System To Log In
        </p>
      </div>

      {/* Logo */}
      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52 lg:w-[250px]" src={logo} alt="Logo" />
      </Link>

      {/* Login Box */}
      <form
        onSubmit={handleSubmit}
        className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 lg:p-16 border border-[#480CBF] bg-white rounded-3xl"
      >
        {/* Welcome Box */}
        <div className="absolute -top-5 left-5 md:left-8 bg-white border border-[#480CBF] p-2 rounded-2xl">
          <h1 className="text-xl md:text-2xl lg:text-[28px] leading-tight text-[#480CBF]">
            Welcome!
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Patient ID Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg p-2 md:w-[130px] md:h-[50px] text-sm md:text-base font-inter text-[#480CBF] rounded-xl">
            Patient ID
          </button>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="w-full md:w-[70%] bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5 relative">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg md:w-[130px] md:h-[50px] text-sm md:text-base font-inter text-[#480CBF] rounded-xl">
            Password
          </button>
          <div className="relative w-full md:w-[70%]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#480CBF]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <Link
            to="/forgot-password"
            className="text-red-600 text-sm md:text-base hover:underline"
          >
            If forgot password, click here
          </Link>
        </div>

        {/* Login Button */}
        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="w-full md:w-[170px] text-center shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 text-white text-sm md:text-base leading-[22px] bg-[#480CBF] p-2 md:p-3 rounded-xl"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
