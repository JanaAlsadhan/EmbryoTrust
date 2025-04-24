import React, { useContext, useState } from "react";
import user from "../assets/user.png";
import { Link } from "react-router-dom";
import StatesContext from "../../context/StatesContext";

const AddDoctor = () => {
  const { createDoctor, logout } = useContext(StatesContext);
  const [doctorData, setDoctorData] = useState({
    name: "",
    password: "",
    dob: "",
    gender: "",
    speciality: "",
    email: "",
    phoneNumber: "",
  });
 
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDoctor(doctorData); // Call context function
      alert("Doctor added successfully!");
      setDoctorData({
        name: "",
        password: "",
        dob: "",
        gender: "",
        speciality: "",
        email: "",
        phoneNumber: "",
      }); // Reset form
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
    <div>
      {/* Top Section */}
      <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-2 rounded-lg shadow-md">
        {/* Left Section: User Image & Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
            <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
          </div>
          <div className="lg:flex grid grid-cols-2 lg:flex-row gap-2 w-full md:w-auto">
            {[
            
              { path: "/patient-list", label: "Patient List", primary: true },
              { path: "/add-doctor", label: "Add Doctor", primary: false },
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
          <button className="w-full sm:w-auto md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md">
            Settings
          </button>
          <button
            onClick={logout}
            className="w-full sm:w-auto md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Add Doctor Form */}
      <div className="mt-24 mb-8 px-4">
        <form
          onSubmit={handleSubmit}
          className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md"
        >
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold py-4 md:mr-auto w-full text-center md:w-[20%] rounded-md">
              Add A Doctor
            </h2>
          </div>

          <div className="px-4 md:px-8 mt-4">
  {[
    { label: "Name", type: "text", name: "name" },
    { label: "Password", type: "password", name: "password" },
    { label: "Date Of Birth", type: "date", name: "dob" },
    { label: "Gender", type: "select", name: "gender", options: ["Male", "Female"] },
    { label: "Specialty", type: "select", name: "speciality", options: ["Fertility Specialist", "Embryologist"] },
    { label: "Email Address", type: "email", name: "email" },
    { label: "Phone Number", type: "text", name: "phoneNumber" },
  ].map(({ label, type, name, options }) => (
    <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
      {/* Field Label */}
      <div className="w-full md:w-[400px]">
        <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
          {label}
        </h1>
      </div>

      {/* Input or Select */}
      {type === "select" ? (
        <select
          name={name}
          value={doctorData[name]}
          onChange={handleChange}
          className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
          required
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={doctorData[name]}
          onChange={handleChange}
          className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
          type={type}
          required
        />
      )}
    </div>
  ))}
</div>

          {/* Submit Button */}
          <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
            <button
              type="submit"
              className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
