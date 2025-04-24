import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import home from "../../../assets/home.png";
import StatesContext from '../../../../context/StatesContext';

const MedicalShedule = ({ patient }) => {
  console.log(patient);

  const { getMedicalSheudle } = useContext(StatesContext);
  const [shadule, setShadule] = useState(null);
  
  console.log(shadule); // Check the fetched data

  useEffect(() => {
    const fetchMedicalSchedule = async () => {
      try {
        const data = await getMedicalSheudle(patient.patientId);
        setShadule(data.data);
      } catch (error) {
        console.error("Failed to fetch patient schedule", error);
      }
    };

    if (patient?.patientId) {
      fetchMedicalSchedule();
    }
  }, [getMedicalSheudle, patient]);

  return (
    <div>
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        {/* Patient ID */}
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID: {patient.patientId}</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          {[
            { path: "", label: "Medical Schedule", active: true },
          ].map(({ path, label, active }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-3 py-2 text-sm md:text-base text-center ${
                active
                  ? "bg-[#51A17B] text-white shadow-lg"
                  : "bg-white text-[#51A17B] shadow-md hover:bg-[#E6F4EC]"
              } transition-all duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Medical Schedule Data */}
      <div className='mt-24 mb-8 px-4'>
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Prescribe Medication
            </h2>
          </div>

          {/* Show Data from Schedule */}
          {shadule ? (
            <div className="px-4 md:px-8 mt-4">
              {[
                { label: "Medication Name", value: shadule.medicineName },
                { label: "Dosage", value: shadule.dose },
                { label: "Frequency", value: shadule.frequency },
                { label: "Refills", value: shadule.refills },
                { label: "Prescribe Date", value: shadule.prescribeDate ? shadule.prescribeDate.split("T")[0] : "" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                  <div className="w-full md:w-[400px]">
                    <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                      {label}
                    </h1>
                  </div>
                  <input
                    className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                    type="text"
                    value={value || "N/A"} 
                    readOnly
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 my-6">No medical schedule found for this patient.</p>
          )}

          {/* Submit Button */}
          <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
            {/* <button className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
              Submit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalShedule;
