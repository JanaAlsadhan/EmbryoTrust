import React, { useContext, useEffect, useState } from 'react'
import user from "../assets/user.png"
import home from "../assets/home.png"
import { Link, useParams } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'



const Patientinfo = () => {
  const { patientid } = useParams();
  const { state, getPatientByPatientId, updatePregnancy } = useContext(StatesContext);
  
  const [patient, setPatient] = useState({});
  // const [pregnancyStatus, setPregnancyStatus] = useState("");

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const data = await getPatientByPatientId(patientid); // Fetch patient data
        setPatient(data);
        setPregnancyStatus(data.pregnancyStatus || "Not Pregnant"); // Default value
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatientProfile();
  }, [state.doctor, getPatientByPatientId, patientid]);

  // Update pregnancy status
  const handleUpdatePregnancy = async () => {
    try {
      const updatedPatient = await updatePregnancy(patientid, pregnancyStatus);
      setPatient(updatedPatient); // Update state with new data
  setIsEditable(false);
      alert("Pregnancy status updated successfully!");
    } catch (error) {
      console.error("Failed to update pregnancy status", error);
      alert("Failed to update pregnancy status.");
    }
  };

  const [isEditable, setIsEditable] = useState(false);
const [pregnancyStatus, setPregnancyStatus] = useState(patient.pregnancyStatus || "Not Pregnant");

const handleEditClick = () => {
  setIsEditable(true);
};




  const details = [
    { label: "Patient ID", value: patient.patientId },
    { label: "Name", value: patient.name },
    { label: "Date Of Birth", value: patient.dob ? new Date(patient.dob).toLocaleDateString() : "N/A" },
    { label: "Gender", value: patient.gender },
    { label: "Email address", value: patient.email },
    { label: "Phone number", value: patient.phoneNumber },
    { label: "Marital status", value: patient.maritalStatus },
    { label: "Partner ID", value: patient.partnerId },
  ];

  return (
    <div>
      <div className="p-3 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="p-1 rounded-md border border-[#480CBF]">
            <img className="w-14 md:w-16" src={user} alt="User" />
          </div>
          <div className="flex flex-row items-center gap-2 mt-2 md:mt-0">
            <button className="px-4 py-1 bg-[#480CBF] text-white shadow-md md:text-lg text-sm font-medium rounded-md transition-all duration-300">
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
      
      <div className="bg-[#F5F0FF] lg:mx-auto mt-24 mx-4 lg:w-[60%] font-lock rounded-xl flex flex-col gap-4 items-center justify-center p-8 border border-[#480CBF]">
        {details.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3">
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] md:text-center">{item.label}</h1>
            </div>
            <input
              disabled
              value={item.value}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />
          </div>
        ))}

{state.doctor.speciality === "Fertility Specialist" && (
  <div className="mt-3 border w-full rounded-xl border-[#480CBF] p-2 md:p-8">
    <div className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3">
      <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
        <h1 className="w-[229px] md:text-center">Pregnancy Status</h1>
      </div>

      {/* Select Dropdown for Pregnancy Status */}
      <select
        className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
        value={pregnancyStatus}
        onChange={(e) => setPregnancyStatus(e.target.value)}
        disabled={!isEditable} // Disable editing unless "Edit" is clicked
      >
        <option value="Not Pregnant">Not Pregnant</option>
        <option value="Pregnant">Pregnant</option>
      </select>
    </div>

    {/* Edit & Save Buttons */}
    <div className="flex mt-3 justify-end">
      {isEditable ? (
        <button
          onClick={handleUpdatePregnancy}
          className="w-fit px-6 py-2 bg-white text-center font-medium hover:text-white hover:bg-[#480CBF] duration-300 text-[#480CBF] border border-[#480CBF] text-[20px] rounded-full"
        >
          Save
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="w-fit px-6 py-2 bg-white text-center font-medium hover:text-white hover:bg-[#480CBF] duration-300 text-[#480CBF] border border-[#480CBF] text-[20px] rounded-full"
        >
          Edit
        </button>
      )}
    </div>
  </div>
)}

      </div>
    </div>
  );
};


export default Patientinfo
