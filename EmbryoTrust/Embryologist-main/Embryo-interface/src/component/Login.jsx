import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import StatesContext from "../../context/StatesContext";

const Login = () => {
  const { doctorlogin } = useContext(StatesContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    doctorId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await doctorlogin(loginData);
      if (response.success) {
        navigate("/doctor-profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="z-20 pb-20 mt-6 h-full px-4 md:px-8">
      <div className="absolute left-0 bottom-0 z-10 w-full bg-color flex justify-center items-center h-[80px] px-4">
        <p className="text-white text-center w-full font-lock font-semibold text-sm md:text-lg leading-[22px]">
          You Must Be Registered In The Hospital Information System To Log In
        </p>
      </div>

      <Link to="/" className="flex justify-start items-center gap-2">
        <img className="w-40 md:w-52 lg:w-[250px]" src={logo} alt="Logo" />
      </Link>

      <div className="relative my-12 mx-auto w-full max-w-2xl p-6 md:p-12 lg:p-16 border border-[#480CBF] bg-white rounded-3xl">
        <div className="absolute -top-5 left-5 md:left-8 bg-white border border-[#480CBF] p-2 rounded-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#480CBF]">
            Welcome!
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg p-2 md:w-[130px] md:h-[55px] text-sm md:text-lg font-inter text-[#480CBF] rounded-xl">
            Doctor ID
          </button>
          <input
            type="text"
            name="doctorId"
            value={loginData.doctorId}
            onChange={handleChange}
            className="w-full md:w-[70%] bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-5 relative">
          <button className="md:bg-[#F5F0FF] w-fit mr-auto md:mr-0 md:shadow-lg md:w-[130px] md:h-[55px] text-sm md:text-lg font-inter text-[#480CBF] rounded-xl">
            Password
          </button>
          <div className="relative w-full md:w-[70%]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full bg-[#F5F0FF] shadow-lg p-2 text-[#480CBF] rounded-2xl focus:ring-0 text-sm md:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-[#480CBF]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <Link to="/forgot-password" className="text-red-600 text-sm md:text-base hover:underline">
            If forgot password, click here
          </Link>
        </div>

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleLogin}
            className="w-full md:w-[170px] text-center shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 text-white text-sm md:text-lg leading-[24px] bg-[#480CBF] p-2 md:p-3 rounded-xl"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
