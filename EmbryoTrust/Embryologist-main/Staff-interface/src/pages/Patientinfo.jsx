import React, { useContext, useEffect, useState } from 'react';
import user from "../assets/user.png";
import home from "../assets/home.png";
import { Link, useParams } from 'react-router-dom';
import StatesContext from '../../context/StatesContext';

const Patientinfo = () => {
  const { patientId } = useParams();
  const { getPatientByPatientId, updatePatient } = useContext(StatesContext); // Assuming updatePatient function exists
  const [patient, setPatient] = useState(null);
  const [editablePatient, setEditablePatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      if (!patientId) return;
      try {
        const data = await getPatientByPatientId(patientId);
        setPatient(data);
        setEditablePatient(data); // Initialize editable state
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };
    fetchPatientProfile();
  }, [patientId, getPatientByPatientId]);

  if (!patient) {
    return <div className="text-center text-lg text-[#480CBF] mt-10">Loading patient data...</div>;
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updates
  const handleSave = async () => {
    try {
      await updatePatient(patientId, editablePatient); // API call to update patient
      setPatient(editablePatient);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const details = [
    { label: "Patient ID", key: "patientId" },
    { label: "Name", key: "name" },
    { label: "Date Of Birth", key: "dob", format: (value) => new Date(value).toLocaleDateString() },
    { label: "Gender", key: "gender" },
    { label: "partnerId", key: "partnerId" },
    { label: "Email address", key: "email" },
    { label: "Phone number", key: "phoneNumber" },
    { label: "Marital status", key: "maritalStatus" },
  ];

  return (
    <div>
      {/* Top Section */}
      <div className="p-3 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="p-1 rounded-md border border-[#480CBF]">
            <img className="w-14 md:w-16" src={user} alt="User" />
          </div>
          <div className="flex flex-row items-center gap-2 mt-2 md:mt-0">
            <button className="px-4 py-1 bg-[#480CBF] text-white shadow-md md:text-lg text-sm font-medium rounded-md">
              Patient Profile
            </button>
            <Link to="/patient-list">
              <img className="h-5 md:hidden" src={home} alt="Home" />
            </Link>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <Link to="/patient-list">
            <img className="h-5 md:h-6 hidden md:block" src={home} alt="Home" />
          </Link>
        </div>
      </div>

      {/* Patient Details */}
      <div className="bg-[#F5F0FF] lg:mx-auto mt-10 mx-4 lg:w-[60%] font-lock rounded-xl flex flex-col gap-4 items-center justify-center p-8 border border-[#480CBF]">
        {details.map(({ label, key, format }) => (
          <div key={key} className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3">
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] md:text-center">{label}</h1>
            </div>
            <input
              name={key}
              disabled={!isEditing}
              value={format ? format(editablePatient[key]) : editablePatient[key] || " "}
              onChange={handleInputChange}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />
          </div>
        ))}

        {/* Pregnancy Status */}
        {patient.gender !== "Male" && (
          <div className="mt-3 border w-full rounded-xl border-[#480CBF] p-2 md:p-8">
            <div className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3">
              <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
                <h1 className="w-[229px] md:text-center">Pregnancy Status</h1>
              </div>
              <input
                name="pregnancyStatus"
                disabled={!isEditing}
                value={editablePatient.pregnancyStatus || "N/A"}
                onChange={handleInputChange}
                type="text"
                className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
              />
            </div>
          </div>
        )}

        {/* Edit & Save Buttons */}
        <div className="flex mt-3 justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="w-fit px-6 py-2 bg-gray-400 text-center font-medium text-white border border-gray-400 text-[20px] rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-fit px-6 py-2 bg-[#480CBF] text-center font-medium text-white border border-[#480CBF] text-[20px] rounded-full"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-fit px-6 py-2 bg-white text-center font-medium hover:text-white hover:bg-[#480CBF] duration-300 text-[#480CBF] border border-[#480CBF] text-[20px] rounded-full"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patientinfo;
