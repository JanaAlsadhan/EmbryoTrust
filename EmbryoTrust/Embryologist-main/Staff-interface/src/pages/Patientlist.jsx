import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import user from "../assets/user.png";
import home from "../assets/home.png";
import StatesContext from '../../context/StatesContext'



const Patientlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]); // State to hold patient data
  const { logout, allPatient  } = useContext(StatesContext);

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await allPatient(); // Call the function to get patients
        setPatients(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };
    fetchPatients();
  }, [allPatient]);

  // Filter patients based on search input
  const filteredPatients = patients.filter((patient) =>
    patient.patientId.includes(searchTerm)
  );

  return (
    <>
    <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-2 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
              <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
                <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
              </div>
              <div className="lg:flex grid grid-cols-2 lg:flex-row gap-2 w-full md:w-auto">
                {[
                  { path: "/patient-list", label: "Patient List", primary: false },
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

      <div className="border font-lock mt-24 mb-8 rounded-md bg-white border-[#51A17B] w-full max-w-4xl mx-auto p-4">
        {/* Search Bar */}
        <div className="flex flex-wrap items-center p-2 bg-[#51A17B]/70 rounded-md mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full md:w-[30%] bg-white rounded-md outline-none"
          />
          <button className="p-2 bg-white rounded-md">
            <Search className="text-[#3A8762]" />
          </button>
        </div>

        {/* Table */}
        <div className="border border-[#51A17B] rounded-md overflow-hidden">
          {/* Header */}
          <div className="grid-cols-1 hidden lg:grid lg:grid-cols-5 bg-[#51A17B]/70 gap-2 text-white font-semibold p-2">
            <span className="p-1 text-center rounded-lg bg-white text-[#3A8762]">
              Patient ID
            </span>
            <span className="p-1 text-center rounded-lg bg-white text-[#3A8762] col-span-1 md:col-span-1 lg:col-span-4">
              Options
            </span>
          </div>

          {/* Table Rows */}
          {filteredPatients.map((patient, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-5 items-center p-3 gap-2 ${
                index % 2 === 0 ? "bg-[#51A17B]/35" : "bg-white"
              } border-b border-green-300`}
            >
              <span className="font-semibold text-lg md:text-xl text-black text-left">
                {patient.patientId}
              </span>
              <div className="col-span-1 md:col-span-1 lg:col-span-4">
                <div className="flex flex-wrap justify-start lg:justify-center gap-2">
                  {[
                    <Link to={`/patient-info/${patient.patientId}`}>Profile Info</Link>,
                    <Link to={`/records/${patient.patientId}`}>Medical Records</Link>,
                    <Link to={`/egg-info/${patient.patientId}`}>Egg Info</Link>,
                    <Link to={`/schedule/${patient.patientId}`}>Medical Schedule</Link>,
                    <Link to={`/embryo-info/${patient.patientId}`}>Embryo Info</Link>,
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-1 text-md md:text-base border border-[#51A17B] rounded-md shadow-md bg-white text-[#3A8762]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Patientlist;


// export default Patientlist;
