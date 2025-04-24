import React, { useState, useContext } from 'react';
import user from "../assets/user.png";
import { Link } from "react-router-dom";
import StatesContext from '../../context/StatesContext';

const AddPatient = () => {
  const { logout  , addPatient } = useContext(StatesContext);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    password:'',
    phoneNumber: '',
    maritalStatus: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await addPatient(formData);
      setLoading(false)
      alert("Patient added successfully!");
      setFormData({
        name: '',
        dob: '',
        gender: '',
        email: '',
        password:'',
        phoneNumber: '',
        maritalStatus: '',

      });
    } catch (error) {
      alert("Failed to add patient.");
    }
  };

  return (
    <div>
      <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-2 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
            <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
          </div>
          <div className="lg:flex grid grid-cols-2 lg:flex-row gap-2 w-full md:w-auto">
            {[
              { path: "/patient-list", label: "Patient List", primary: true },
              { path: "/add-doctor", label: "Add Doctor", primary: true },
              { path: "/add-patient", label: "Add Patient", primary: false },
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

        <div className="grid md:grid-cols-1 grid-cols-2 gap-2 w-full md:w-auto">
          {["Settings", "Log out"].map((label) => (
            <button
              key={label}
              onClick={logout}
              className="w-full sm:w-auto md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-24 mb-8 px-4">
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold py-4 md:mr-auto w-full text-center md:w-[20%] rounded-md">
              Add A Patient
            </h2>
          </div>

          <form className="px-4 md:px-8 mt-4" onSubmit={handleSubmit}>
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Date Of Birth", name: "dob", type: "date" },
              { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Phone Number", name: "phoneNumber", type: "text" },
              // { label: "Pregnancy Status", name: "pregnancyStatus", type: "select", options: ["Pregnant", "Not Pregnant"] },
              { label: "Marital Status", name: "maritalStatus", type: "select" , options: ["Married"]   },
            ].map(({ label, name, type, options }) => (
              <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[400px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    {label}
                  </h1>
                </div>

                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
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
                    value={formData[name]}
                    onChange={handleChange}
                    className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                    type={type}
                  />
                )}
              </div>
            ))}

            <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
              <button
                type="submit"
                className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {message && <p className="text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
