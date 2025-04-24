import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import StatesContext from "../../context/StatesContext"; // Import Context

const Profile = () => {
  const { logout } = useContext(StatesContext); // Get logout function
   const navigate = useNavigate();
  const details = [
    { label: "Fertility Doctor ID", value: "2302785159" },
    { label: "Name", value: "Ghada Al-Habeeb" },
    { label: "Date Of Birth", value: "08-July-1972" },
    { label: "Gender", value: "Female" },
    { label: "Specialty", value: "Reproductive Endocrinologist" },
  ];

  return (
    <div>
      <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-2 rounded-lg shadow-md">
        {/* Left Section: User Image & Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
            <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
          </div>
          <div className="lg:flex grid grid-cols-2 lg:flex-row gap-2 w-full md:w-auto">
            {[
          
              { path: "/patient-list", label: "Patient List", primary: true },
              { path: "/add-doctor", label: "Add Doctor", primary: true },
              { path: "/add-patient", label: "Add Patient", primary: true },
            ].map(({ path, label, primary }) => (
              <Link
                key={path}
                to={path}
                className={`w-full md:w-[185px] text-center rounded-lg py-2 text-[15px] md:text-[18px] transition-all duration-300 shadow-md ${
                  primary
                    ? "border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105"
                    : "bg-[#480CBF] text-white hover:scale-105"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section: Settings & Logout */}
        <div className="grid md:grid-cols-1 grid-cols-2 gap-2 w-full md:w-auto">
          <button
            onClick={() => navigate("/updatepassword")}
           className="w-full sm:w-auto md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md">
            Settings
          </button>
          <button
            onClick={logout} // Call logout function
            className="w-full sm:w-auto md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-md"
          >
            Log out
          </button>
        </div>
      </div>

      {/* User Details Section */}
      <div className="bg-[#F5F0FF] lg:mx-auto mt-20 mx-4 lg:w-[60%] font-lock rounded-xl flex flex-col gap-4 items-center justify-center p-2 md:p-8 border border-[#480CBF]">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3"
          >
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] text-left md:text-center">
                {item.label}
              </h1>
            </div>
            <input
              disabled
              value={item.value}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />
          </div>
        ))}

        <div className="mt-3 border w-full rounded-xl border-[#480CBF] p-2 md:p-8">
          <div className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3">
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] md:text-center">Email Address</h1>
            </div>
            <input
              disabled
              value="GHabeeb@thuriah.com.sa"
              type="Email"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />
          </div>
          <div className="flex flex-col mt-2 md:flex-row justify-center w-full items-start md:items-center gap-3">
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] md:text-center">Phone Number</h1>
            </div>
            <input
              disabled
              value="966-50-220-7179"
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />
          </div>
          <div className="flex mt-3 justify-end">
            <button className="w-fit px-6 py-2 bg-white text-center font-medium hover:text-white hover:bg-[#480CBF] duration-300 text-[#480CBF] border border-[#480CBF] text-[20px] rounded-full">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
