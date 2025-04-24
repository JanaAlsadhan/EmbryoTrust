import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import home from "../../assets/home.png"
import StatesContext from '../../../context/StatesContext';

const Verfication = () => {
  const { createEggInfo, state, getEggInfoByPatientId, supermsVerification } = useContext(StatesContext);
  // patientId , eggId ,patnerId
  // patient.patientId , eddId , 
  const [patient, setPatient] = useState("");
  const [husbandId, setHusbandId] = useState("");

  const { patientid } = useParams();


  const supermsVerify = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      
      console.log(patient?.patientId, patient.eggId, husbandId)
       await supermsVerification(patient?.patientId, patient.eggId, husbandId);
      alert("Verification successful");
    } catch (error) {
      alert("Something  went wrong!")
      console.error("Error in verification:", error);
    }
  };


  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const data = await getEggInfoByPatientId(patientid); // Fetch patient data
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatientProfile();
  }, [state.doctor, getEggInfoByPatientId, patientid]);

  return (
    <div>
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        {/* Patient ID */}
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID  :  {patientid}</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          {[
            { path: "/verification", label: "Verfication", active: true },
          ].map(({ path, label, active }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-3 py-2 text-sm md:text-base text-center ${active
                ? "bg-[#51A17B] text-white shadow-lg"
                : "bg-white text-[#51A17B] shadow-md hover:bg-[#E6F4EC]"
                } transition-all duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Home Button */}
        <Link className='flex justify-end w-full lg:w-fit items-center' to="/patient-list">
          <img className="h-5 md:h-6 " src={home} alt="Home" />
        </Link>
      </div>

      <div className='mt-24 mb-8 px-4'>
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold py-4 md:mr-auto w-full  text-center md:w-[30%] rounded-md">
              Verify Owner Of Sperm
            </h2>
          </div>

          {patient ?
            <>
              <div className="px-4 md:px-8 mt-4">
                {[
                  {
                    label: "Patient's husband's ID",
                    type: "text",
                    value: husbandId,
                    onChange: (e) => setHusbandId(e.target.value), // Handle input change
                  },
                  { label: "Owner of Sperm's ID", type: "text", value: patient.patientId || "" },
                ].map(({ label, type, value, onChange }) => (
                  <div key={label} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                    <div className="w-full md:w-[400px]">
                      <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                        {label}
                      </h1>
                    </div>
                    <input
                      className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                      type={type}
                      value={value}
                      onChange={onChange} // Ensure input updates state
                    />
                  </div>
                ))}
              </div>

              {/* Fertilization Request */}
              <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
                <button
                  onClick={supermsVerify} // Call function on button click
                  className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40"
                >
                  Submit
                </button>
              </div>
            </>
            : <h1 className="text-red-500 text-center mt-4">No information available</h1>
          }
        </div>
      </div>
    </div>
  )
}

export default Verfication
