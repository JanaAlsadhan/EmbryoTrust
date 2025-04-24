import React, { useContext, useEffect, useState } from "react";
import home from "../../assets/home.png";
import { Link, useParams } from "react-router-dom";
import StatesContext from "../../../context/StatesContext";

const Egginfo = () => {
  const { patientid } = useParams();
  const { getAllEggInfoByPatientId, doctorComfrimation, doctorDney, updateEggInformation, state  } = useContext(StatesContext);
  
  const [eggInfo, setEggInfo] = useState([]);
  const [attachReasons, setAttachReasons] = useState({}); // Store attachReasons per egg ID

  useEffect(() => {
    const fetchEggInfo = async () => {
      try {
        const data = await getAllEggInfoByPatientId(patientid);
        setEggInfo(data || []);
        
        // Initialize attachReason for each egg
        const initialReasons = {};
        data.forEach(egg => {
          initialReasons[egg.eggId] = egg.attachReason || "";
        });
        setAttachReasons(initialReasons);
      } catch (error) {
        console.error("Failed to fetch egg info:", error);
      }
    };

    fetchEggInfo();
  }, [patientid]);

  const handleChange = (e, eggId) => {
    setAttachReasons({ ...attachReasons, [eggId]: e.target.value });
  };

  const handleUpdateReason = async (eggId) => {
    try {
      const attachReason = attachReasons[eggId] ;
      await updateEggInformation(eggId , attachReason , patientid);
      alert("Attach Reason updated successfully!");
    } catch (error) {
      console.error("Error updating attach reason:", error);
      alert("Failed to update reason.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg shadow-md">
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID: {patientid}</h1>
        </div>
        <Link className="flex justify-end w-full lg:w-fit items-center" to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      {/* Egg Info Section */}
      {eggInfo.length === 0 ? (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-[#51A17B]">No Patient Data</h2>
          <p className="text-[#3A8762] mt-2">We couldn't find any egg information for this patient.</p>
        </div>
      ) : (
        eggInfo.map((egg, index) => (
          <div key={egg.eggId || index} className="border border-green-700 mt-6 rounded-lg shadow-md w-full md:w-[1000px] mx-auto bg-white">
            <div className="p-4 bg-[#51A17B]/70 flex justify-center rounded-t-lg">
              <h2 className="bg-white text-[#3A8762] font-semibold p-4 w-full text-center rounded-md">
                Egg Information #{index + 1}
              </h2>
            </div>

            <div className="px-4 md:px-8 my-4">
              {/* Read-only Fields */}
              {["eggId", "collectionDate", "status", "details", "patientRequest"].map((field) => (
                <div key={field} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                  <div className="w-full md:w-[250px]">
                    <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </h1>
                  </div>
                  <input
                    value={field === "collectionDate" ? formatDate(egg[field]) : egg[field] || ""}
                    readOnly
                    className="border text-[#3A8762] p-2 w-full md:w-[800px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#51A17B]/50"
                  />
                </div>
              ))}

              {/* Attach Reason - Editable */}
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[250px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    Attach A Reason
                  </h1>
                </div>
                <input
                  name="attachReason"
                  value={attachReasons[egg.eggId] ||egg.attachReason }
                  onChange={(e) => handleChange(e, egg.eggId)}
                  className="border text-[#3A8762] p-2 w-full md:w-[800px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#51A17B]/50"
                  type="text"
                />
              </div>

              {/* Update Reason Button */}
      { state.doctor.speciality !== "Embryologist" &&          <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleUpdateReason(egg.eggId)}
                  className="bg-[#51A17B] text-white px-4 py-2 rounded-md hover:bg-[#3A8762] transition"
                >
                  Update Reason
                </button>
              </div>}

              {/* Fertilization Confirmation */}
          { state.doctor.speciality !== "Embryologist" &&   <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
                {egg.doctorConfirmation === "Denied" ? (
                  <h1 className="text-2xl font-bold text-[#480CBF]">Doctor Confirmation Denied</h1>
                ) : egg.doctorConfirmation === "Confirm" ? (
                  <div className="flex justify-center items-center gap-2">
                    <button className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 w-[120px] rounded-md hover:bg-[#480CBF]/40 transition">
                      Already Confirmed
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <p className="mr-2 font-bold text-[#3A8762]">Want to start fertilization?</p>
                    <button onClick={() => doctorComfrimation(egg.eggId)} className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 w-[120px] rounded-md hover:bg-[#480CBF]/40 transition">
                      Confirm
                    </button>
                    <button onClick={() => doctorDney(egg.eggId)} className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 w-[120px] rounded-md hover:bg-[#480CBF]/40 transition">
                      Deny
                    </button>
                  </div>
                )}
              </div>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Egginfo;
















// import React, { useContext, useEffect, useState } from "react";
// import home from "../../assets/home.png";
// import { Link, useParams } from "react-router-dom";
// import StatesContext from "../../../context/StatesContext";

// const Egginfo = () => {
//   const { patientid } = useParams();
//   const { getEggInfoByPatientId , doctorComfrimation } = useContext(StatesContext);
//   const [eggInfo, setEggInfo] = useState({});

//   const [formData, setFormData] = useState({
//     eggID: "",
//     collectionDate: "",
//     status: "",
//     details: "",
//     patientRequest: "",
//     reason: "",
//   });

//   useEffect(() => {
//     const fetchEggInfo = async () => {
//       try {
//         const data = await getEggInfoByPatientId(patientid); // Fetch patient data
//         setEggInfo(data);

//         // Populate formData when data is fetched
//         setFormData({
//           eggID: data.eggId || "",
//           collectionDate: data.collectionDate ? data.collectionDate.split("T")[0] : "",
//           status: data.status || "",
//           details: "", // No details in API response
//           patientRequest: data.patientRequest || "",
//           reason: data.attachReason || "",
//         });
//       } catch (error) {
//         console.error("Failed to fetch patient", error);
//       }
//     };

//     fetchEggInfo();
//   }, [getEggInfoByPatientId, patientid]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const fields = [
//     { label: "Egg ID", type: "text", name: "eggID" },
//     { label: "Collection Date", type: "date", name: "collectionDate" },
//     {
//       label: "Status",
//       type: "select",
//       name: "status",
//       options: ["Pending","Retrieved"],
//     },
//     { label: "Details", type: "text", name: "details" },
//     { label: "Patient's Request", type: "text", name: "patientRequest" },
//     { label: "Attach A Reason", type: "text", name: "reason" },
//   ];

//   return (
//     <div>
//       <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
//         {/* Patient ID */}
//         <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
//           <h1 className="text-center text-sm md:text-base font-medium">Patient ID: {patientid}</h1>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
//           {[
//             { path: `/records/${patientid}`, label: "Medical Results" },
//             { path: `/egg-info/${patientid}`, label: "Egg Info", active: true },
//             { path: `/blood-test/${patientid}`, label: "Blood Test" },
//             { path: `/Ultrasound/${patientid}`, label: "UltraSound" },
//           ].map(({ path, label, active }) => (
//             <Link
//               key={path}
//               to={path}
//               className={`rounded-lg px-3 py-2 text-sm md:text-base text-center ${
//                 active ? "bg-[#51A17B] text-white shadow-lg" : "bg-white text-[#51A17B] shadow-md hover:bg-[#E6F4EC]"
//               } transition-all duration-300`}
//             >
//               {label}
//             </Link>
//           ))}
//         </div>

//         {/* Home Button */}
//         <Link className="flex justify-end w-full lg:w-fit items-center" to="/patient-list">
//           <img className="h-5 md:h-6" src={home} alt="Home" />
//         </Link>
//       </div>

//       <div className="mt-24 mb-8 px-4">
//         <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
//           <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
//             <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
//               Egg Information
//             </h2>
//           </div>

//           <div className="px-4 md:px-8 my-4">
//             {fields.map(({ label, type, name, options }) => (
//               <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
//                 <div className="w-full md:w-[300px]">
//                   <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
//                     {label}
//                   </h1>
//                 </div>

//                 {type === "select" ? (
//                   <select
//                     name={name}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     className="border text-[#3A8762] p-2 w-full rounded-md"
//                   >
//                     <option value="">Select {label}</option>
//                     {options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     name={name}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     className="border text-[#3A8762] p-2 w-full rounded-md"
//                     type={type}
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Fertilization Confirmation */}
//             <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
//               <p className="mr-2 font-bold">Want to start fertilization?</p>
//               <div className="flex justify-center items-center gap-2">
//                 <button   onClick={() => doctorComfrimation(eggInfo.eggId)}  className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
//                   Confirm
//                 </button>
//                 <button className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
//                   Deny
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Egginfo;

