import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="my-16 px-6 md:px-16 lg:px-28 bg-white text-left">
      <h1 className="font-opensans text-[#480CBF] text-3xl md:text-5xl lg:text-[50px] leading-tight md:leading-[60px] lg:leading-[80px]">
        Welcome To EmbryoTrust <br />
        Electronic Medical Records System
      </h1>

      <p className="text-[#480CBF] font-lock text-lg md:text-2xl lg:text-[26px] mt-4 leading-relaxed">
        Welcome to your secure choice for the fertility journey. Our mission is
        to offer a safe platform for managing sensitive medical records for both
        patients and healthcare providers. With blockchain technology, we make
        sure your data is protected and easy to access whenever you need it.
        We've got your back!
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start mt-8">
        <Link
          to="/login"
          className="w-full md:w-[175px] shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 rounded-lg text-white text-lg md:text-[20px] leading-[28px] bg-[#480CBF] py-3 text-center"
        >
          Log In
        </Link>
        <button className="w-full md:w-[175px] rounded-lg shadow-black/40 hover:scale-105 transition-transform duration-300 text-[#480CBF] border border-[#480CBF] text-lg md:text-[20px] leading-[28px] shadow-lg bg-[#F5F0FF] py-3">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Banner;
