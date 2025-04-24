import React, { useContext, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
// import home from "../../assets/home.png";
import user from "../../assets/user.png";
import Userinfo from "./Userinfo";
// import Medical from "./Medical/Medical";
import StatesContext from "../../../context/StatesContext";
import Request from "./Medical/Request";
import MedicalShedule from "./Medical/MedicalShedule";
import Records from "./Medical/Medical";

const User = () => {
  const { state, getPatientByPatientId, logout } = useContext(StatesContext);
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [opentab, setOpentab] = useState("1");

  useEffect(() => {
    const fetchPatientProfile = async () => {
      const patientId = state.user.patientId
      if (!patientId) return; // Prevent unnecessary API calls if patientId is undefined

      try {
        const data = await getPatientByPatientId(patientId); // Fetch patient data
        setPatient(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatientProfile();
  }, [state.user, getPatientByPatientId]);

  if (!patient) {
    return <div className="text-center text-lg text-[#480CBF] mt-10">Loading patient data...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9F7FF]">
      {/* Top Section */}
      <div className="p-3 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row justify-between items-center">
        {/* Left: User & Tabs */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* User Image */}
          <div className="p-1 rounded-lg border border-[#480CBF]">
            <img className="w-14 md:w-16" src={user} alt="User" />
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-3 md:mt-0">
            <button
              onClick={() => setOpentab("1")}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all duration-300 ${opentab === "1"
                  ? "bg-[#480CBF] text-white shadow-md"
                  : "text-[#480CBF] border border-[#480CBF] hover:bg-[#E0D4FF]"
                }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setOpentab("2")}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all duration-300 ${opentab === "2"
                  ? "bg-[#480CBF] text-white shadow-md"
                  : "text-[#480CBF] border border-[#480CBF] hover:bg-[#E0D4FF]"
                }`}
            >
              Medical Record
            </button>
            <button
              onClick={() => setOpentab("3")}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all duration-300 ${opentab === "3"
                  ? "bg-[#480CBF] text-white shadow-md"
                  : "text-[#480CBF] border border-[#480CBF] hover:bg-[#E0D4FF]"
                }`}
            >
              Egg Information
            </button>
            <button
              onClick={() => setOpentab("4")}
              className={`px-4 py-1 text-sm font-medium rounded-md transition-all duration-300 ${opentab === "4"
                  ? "bg-[#480CBF] text-white shadow-md"
                  : "text-[#480CBF] border border-[#480CBF] hover:bg-[#E0D4FF]"
                }`}
            >
              Medical Shedule
            </button>

          </div>
        </div>

        {/* Right: Settings & Logout */}
        <div className="flex md:flex-col sm:flex-row gap-1 sm:gap-2 mt-3 md:mt-0">
          <button 
          onClick={()=> navigate("/updatepassword")}
          className="w-full sm:w-[90px] px-3 py-1 text-sm font-medium text-[#480CBF] border border-[#480CBF] rounded-md transition-all duration-300 hover:bg-[#E0D4FF]">
            Settings
          </button>
          <button onClick={logout} className="w-full sm:w-[90px] px-3 py-1 text-sm font-medium text-[#480CBF] border border-[#480CBF] rounded-md transition-all duration-300 hover:bg-red-100">
            Log Out
          </button>
        </div>
      </div>


      {/* Content Section */}
      <div className="p-6 flex items-center justify-center mt-12">
        {opentab === "1" && <Userinfo patient={patient} />}
        {opentab === "2" && <Records patientId={patient.patientId} />}
        {opentab === "3" && <Request patient={state.user.patientId} />}
        {opentab === "4" && <MedicalShedule patient={state.user} />}
      </div>
    </div>
  );
};

export default User;
