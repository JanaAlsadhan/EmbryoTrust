import React, { useContext, useState } from 'react';
import StatesContext from '../../../context/StatesContext';
import { useEffect } from 'react';

const Userinfo = ({ patient }) => {
  const { updatePatient } = useContext(StatesContext);

  // State for email & phone number
  const [email, setEmail] = useState(patient.email);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [isEditing, setIsEditing] = useState(false);

  // Patient details (non-editable)
  const details = [
    { label: "Patient ID", value: patient.patientId },
    { label: "Name", value: patient.name },
    { label: "Date Of Birth", value: patient.dob ? new Date(patient.dob).toLocaleDateString() : "N/A" },
    { label: "Gender", value: patient.gender },
    { label: "Marital Status", value: patient.maritalStatus },
    { label: "Partner ID", value: patient.partnerId },
    { label: "Pregnancy Status", value: patient.pregnancyStatus },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "phoneNumber") setPhoneNumber(value);
  };

  // Handle Save
  const handleSave = async () => {
    try {
        console.log("Saving patient details...");
        await updatePatient(patient.patientId, { email, phoneNumber });
        setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
        console.error("Error updating patient:", error);
    }
};


  return (
    <div className="bg-[#F5F0FF] w-full max-w-3xl mx-auto font-lock rounded-xl flex flex-col gap-6 items-center p-6 border border-[#480CBF]">
      {/* Patient Details (Non-editable) */}
      {details.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-center w-full items-center gap-3">
          <div className="p-2 text-lg md:text-xl md:shadow-lg rounded-md mr-auto md:mr-0 md:bg-white text-[#480CBF] w-fit md:w-[230px] text-center">
            {item.label}
          </div>
          <input
            disabled
            value={item.value}
            type="text"
            className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-lg md:text-xl"
          />
        </div>
      ))}

      {/* Contact Information Section */}
      <div className="mt-3 border w-full rounded-xl border-[#480CBF] p-6">
        {/* Email Field */}
        <div className="flex flex-col md:flex-row justify-center w-full items-center gap-3">
          <div className="p-2 text-lg md:text-xl md:shadow-lg rounded-md mr-auto md:mr-0 md:bg-white text-[#480CBF] w-full md:w-[230px] md:text-center">
            Email Address
          </div>
          <input
            name="email"
            value={ email || patient.email }
            onChange={handleChange}
            disabled={!isEditing}
            type="text"
            className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-lg md:text-xl"
          />
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col md:flex-row justify-center mt-6 w-full items-center gap-3">
          <div className="p-2 text-lg md:text-xl md:shadow-lg rounded-md mr-auto md:mr-0 md:bg-white text-[#480CBF] w-full md:w-[230px] md:text-center">
            Phone Number
          </div>
          <input
            name="phoneNumber"
            value={ phoneNumber|| patient.phoneNumber }
            onChange={handleChange}
            disabled={!isEditing}
            type="text"
            className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-lg md:text-xl"
          />
        </div>

        {/* Edit & Save Buttons */}
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#480CBF] text-white border border-[#480CBF] rounded-full text-lg font-medium transition duration-300 hover:bg-[#370899]"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-white text-[#480CBF] border border-[#480CBF] rounded-full text-lg font-medium transition duration-300 hover:bg-[#480CBF] hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
