import React, { useContext, useEffect, useState } from "react";
import home from "../../assets/home.png";
import { Link, useParams } from "react-router-dom";
import StatesContext from "../../../context/StatesContext";

const EggInfoEmbrologist = () => {
  const { patientid } = useParams();
  const { getEggInfoByPatientId, getAllEggInfoByPatientId, doctorComfrimation, doctorDney, state } = useContext(StatesContext);
  const [eggInfo, setEggInfo] = useState([]);
  const [formData, setFormData] = useState({
    eggID: "",
    collectionDate: "",
    status: "",
    details: "",
    patientRequest: "",
    attachReason: "",
  });

  console.log(eggInfo);

  useEffect(() => {
    const fetchEggInfo = async () => {
      try {
        const data = await getAllEggInfoByPatientId(patientid);
        setEggInfo(data || []);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchEggInfo();
  }, [getEggInfoByPatientId, patientid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function to format date into a readable format.
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Separate function for doctor confirmation
  const handleDoctorConfirmation = async (eggId) => {
    try {
      await doctorComfrimation(eggId);
      alert("Doctor confirmation successful!");
      // Optionally, update state or re-fetch data here.
    } catch (error) {
      console.error("Error during doctor confirmation:", error);
      alert("Error confirming doctor First  Check  Patient Side.");
    }
  };

  // Separate function for doctor denial
  const handleDoctorDeny = async (eggId) => {
    try {
      const res = await doctorDney(eggId);
      alert("Doctor confirmation denied!");
      // Optionally, update state or re-fetch data here.
    } catch (error) {
      console.error("Error during doctor denial:", error);
      alert("Error denying doctor confirmation First  Check  Patient Side.");
    }
  };

  // Fields configuration – all fields are inputs now.
  const fields = [
    { label: "Egg ID", type: "text", name: "eggId" },
    { label: "Collection Date", type: "text", name: "collectionDate" },
    { label: "Status", type: "text", name: "status" },
    { label: "Details", type: "text", name: "details" },
    { label: "Patient's Request", type: "text", name: "patientRequest" },
    { label: "Fertility  Doctor Confrim", type: "text", name: "doctorConfirmation" },
    { label: "Attach A Reason", type: "text", name: "attachReason" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg shadow-md">
        {/* Patient ID */}
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">
            Patient ID: {patientid}
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          {[
            { path: `/records/${patientid}`, label: "Medical Results" },
            { path: `/egg-info/${patientid}`, label: "Egg Info", active: true },
            { path: `/blood-test/${patientid}`, label: "Blood Test" },
            { path: `/Ultrasound/${patientid}`, label: "UltraSound" },
          ].map(({ path, label, active }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-3 py-2 w-[150px] text-sm md:text-base text-center transition-all duration-300 ${active
                ? "bg-[#51A17B] text-white shadow-lg"
                : "bg-white text-[#51A17B] shadow-md hover:bg-[#E6F4EC]"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Home Button */}
        <Link className="flex justify-end w-full lg:w-fit items-center" to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      {/* Egg Info Section */}
      {eggInfo
        .filter((egg) => state.doctor.speciality === "Embryologist" && egg.doctorConfirmation === "Confirm")
        .map((egg, index) => (
          <div
            key={egg.eggId || index}
            className="border border-green-700 mt-6 rounded-lg shadow-md w-full md:w-[1000px] mx-auto bg-white"
          >
            <div className="p-4 bg-[#51A17B]/70 flex justify-center rounded-t-lg">
              <h2 className="bg-white text-[#3A8762] font-semibold p-4 w-full text-center rounded-md">
                Egg Information #{index + 1}
              </h2>
            </div>

            <div className="px-4 md:px-8 my-4">
              {fields
                .filter(
                  (field) =>
                    field.name !== "doctorConfirmation" || egg.doctorConfirmation === "Confirm"
                )
                .map(({ label, type, name }) => (
                  <div
                    key={name}
                    className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4"
                  >
                    <div className="w-full md:w-[250px]">
                      <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                        {label}
                      </h1>
                    </div>

                    <input
                      name={name}
                      value={
                        name === "collectionDate"
                          ? formatDate(egg[name])
                          : egg[name] || ""
                      }
                      readOnly
                      className="border text-[#3A8762] p-2 w-full md:w-[800px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#51A17B]/50"
                      type={type}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}


    </div>
  );
};

export default EggInfoEmbrologist;


