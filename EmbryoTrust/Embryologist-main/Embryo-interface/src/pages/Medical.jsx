import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import home from "../assets/home.png";
import StatesContext from "../../context/StatesContext";

const Medical = () => {
  const { createMedication } = useContext(StatesContext);
  const { patientid } = useParams();

  // State for form inputs
  const [formData, setFormData] = useState({
    medicineName: "",
    dose: "",
    frequency: "",
    refills: "",
    prescribeDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicationData = {
      patientId: patientid, // Get from URL params
      ...formData, // Spread form input values
    };

    try {
      await createMedication(medicationData);
      alert("Medication prescribed successfully!");
    } catch (error) {
      alert("Failed to prescribe medication.");
    }
  };

  return (
    <div>
      {/* Patient ID */}
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">
            Patient ID: {patientid}
          </h1>
        </div>
        <Link className="flex justify-end w-full lg:w-fit items-center" to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      {/* Medication Form */}
      <div className="mt-24 mb-8 px-4">
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Prescribe Medications
            </h2>
          </div>

          <form className="px-4 md:px-8 mt-4" onSubmit={handleSubmit}>
            {[
              { name: "medicineName", label: "Medication Name", type: "text" },
              { name: "dose", label: "Dosage", type: "text" },
              { name: "frequency", label: "Frequency", type: "text" },
              { name: "refills", label: "Refills", type: "number" },
              { name: "prescribeDate", label: "Prescribe Date", type: "date" },
            ].map(({ name, label, type }) => (
              <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[400px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    {label}
                  </h1>
                </div>
                <input
                  className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
              <button type="submit" className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Medical;
