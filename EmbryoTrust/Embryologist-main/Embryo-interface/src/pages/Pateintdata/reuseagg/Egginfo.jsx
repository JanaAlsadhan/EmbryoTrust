// import React, { useState, useContext, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import home from "../../../assets/home.png";
// import StatesContext from "../../../../context/StatesContext";
// import { BACKEND_URL } from "../../../constant";

// const EggInformation = () => {
//   const { createEggInfo, getAllEggInfoByPatientId } = useContext(StatesContext);
//   const { patientid } = useParams();

//   const [retrievedEggs, setRetrievedEggs] = useState("");
//   const [patient, setPatient] = useState("");
//   const [eggList, setEggList] = useState([]);
//   const [currentEggIndex, setCurrentEggIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPatientProfile();
//   }, [patientid, retrievedEggs]);

//   const fetchPatientProfile = async () => {
//     try {
//       const data = await getAllEggInfoByPatientId(patientid);
//       setPatient(data);
//       setEggList(data.eggList || []);
//     } catch (error) {
//       console.error("Failed to fetch patient", error);
//     }
//   };

//   const handleEggCountSubmit = async (e) => {
//     e.preventDefault();
//     if (!retrievedEggs) {
//       alert("Please enter the number of retrieved eggs.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createEggInfo({ patientId: patientid, retrievedEggs: Number(retrievedEggs) });
//       alert("Egg information submitted successfully!");
//       fetchPatientProfile();
//     } catch (error) {
//       alert("Failed to submit egg information.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSingleEggSubmit = async (e) => {
//     e.preventDefault();
//     const egg = eggList[currentEggIndex];

//     if (!egg.eggId) {
//       alert("Egg ID is required to update the information.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.put(`${BACKEND_URL}/egginfo`, { ...egg, patientId: patientid });

//       if (response.status === 200) {
//         alert(`Egg ${currentEggIndex + 1} details updated successfully!`);
//         setCurrentEggIndex((prev) => (prev + 1 < eggList.length ? prev + 1 : prev));
//       } else {
//         alert(response.data.message || "Failed to update egg information.");
//       }
//     } catch (error) {
//       alert("An error occurred while updating egg information.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
//         <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
//           <h1 className="text-center text-sm md:text-base font-medium">Patient ID : {patientid}</h1>
//         </div>
//         <Link to={`/egg-information/${patientid}`} className="rounded-lg px-3 py-2 text-sm md:text-base bg-[#51A17B] text-white shadow-lg">
//           Egg Info
//         </Link>
//         <Link to="/patient-list">
//           <img className="h-5 md:h-6" src={home} alt="Home" />
//         </Link>
//       </div>

//       <div className="mt-24 mb-8 px-4">
//         <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
//           <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
//             <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">Egg Information</h2>
//           </div>

//           {eggList.length === 0 ? (
//             <form onSubmit={handleEggCountSubmit} className="px-4 md:px-8 mt-4">
//               <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
//                 <label className="md:w-[30%] w-full bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center">Number of retrieved eggs</label>
//                 <input
//                   className="border border-[#3A8762] shadow-lg p-2 w-full md:w-[70%] rounded-md"
//                   type="number"
//                   value={retrievedEggs}
//                   onChange={(e) => setRetrievedEggs(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="m-4 flex justify-end">
//                 <button type="submit" className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40" disabled={loading}>
//                   {loading ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSingleEggSubmit} className="px-4 md:px-8 mt-4">
//               <h2 className="text-center text-lg font-semibold">Egg {currentEggIndex + 1} Details</h2>
//               {Object.keys(eggList[currentEggIndex] || {}).map((key) => (
//                 <div key={key} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
//                   <label className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                   <input
//                     className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md"
//                     type="text"
//                     value={eggList[currentEggIndex]?.[key] || ""}
//                     onChange={(e) => setEggList((prev) => {
//                       const newList = [...prev];
//                       newList[currentEggIndex][key] = e.target.value;
//                       return newList;
//                     })}
//                     required
//                   />
//                 </div>
//               ))}
//               <div className="m-4 flex justify-end">
//                 <button type="submit" className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
//                   {currentEggIndex + 1 === eggList.length ? "Finish" : "Next Egg"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EggInformation;



import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import StatesContext from "../../../../context/StatesContext";
import { BACKEND_URL } from "../../../constant";
import home from "../../../assets/home.png";


const EggInformation = () => {
  const { createEggInfo, getAllEggInfoByPatientId } = useContext(StatesContext);
  const { patientid } = useParams();

  const [retrievedEggs, setRetrievedEggs] = useState("");
  const [patient, setPatient] = useState("");
  const [eggList, setEggList] = useState([]);
  const [currentEggIndex, setCurrentEggIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(eggList);
  const fetchPatientProfile = async () => {
    try {
      const data = await getAllEggInfoByPatientId(patientid);
      setPatient(data);
      setEggList(data);
    } catch (error) {
      console.error("Failed to fetch patient", error);
    }
  };

  const handleEggCountSubmit = async (e) => {
    e.preventDefault();
    if (!retrievedEggs) {
      alert("Please enter the number of retrieved eggs.");
      return;
    }

    const eggData = { patientId: patientid, retrievedEggs: Number(retrievedEggs) };

    try {
      setLoading(true);
      await createEggInfo(eggData);
      alert("Egg information submitted successfully!");
      fetchPatientProfile();
    } catch (error) {
      alert("Failed to submit egg information.");
    } finally {
      setLoading(false);
    }
  };

  const handleSingleEggSubmit = async (e) => {
    e.preventDefault();
    const egg = eggList[currentEggIndex];

    if (!egg.eggId) {
      alert("Egg ID is required to update the information.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`${BACKEND_URL}/egginfo/update`, {
        eggId: egg.eggId,
        date: egg.date,
        details: egg.details,
        status: egg.status,
        patientId: patientid,
      });

      if (response.status === 200) {
        alert(`Egg ${currentEggIndex + 1} details updated successfully!`);
        if (currentEggIndex + 1 < eggList.length) {
          setCurrentEggIndex(currentEggIndex + 1);
        } else {
          alert("All eggs updated successfully!");
        }
      } else {
        alert(response.data.message || "Failed to update egg information.");
      }
    } catch (error) {
      console.error("Error updating egg information:", error);
      alert("An error occurred while updating egg information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">
            Patient ID : {patientid}
          </h1>
        </div>
        <Link to={`/egg-information/${patientid}`} className="rounded-lg px-3 py-2 text-sm md:text-base bg-[#51A17B] text-white shadow-lg">
          Egg Info
        </Link>
        <Link to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      {/* Form Section */}
      <div className="mt-24 mb-8 px-4">
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Egg Info
            </h2>
          </div>

          {/* Step 1: Retrieve Egg Count */}
          {eggList.length === 0 && (
            <form onSubmit={handleEggCountSubmit} className="px-4 md:px-8 mt-4">
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <h1 className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center">
                  Number of retrieved eggs
                </h1>
                <input
                  className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md"
                  type="number"
                  value={retrievedEggs}
                  onChange={(e) => setRetrievedEggs(e.target.value)}
                  required
                />
              </div>
              <div className="m-4 flex justify-end">
                <button type="submit" className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Fill Egg Details One by One */}
          {eggList.length > 0 && currentEggIndex < eggList.length && (
            <form onSubmit={handleSingleEggSubmit} className="px-4 md:px-8 mt-4">
              <h2 className="text-center text-lg font-semibold">Egg {currentEggIndex + 1} Details</h2>

              {/* Egg ID (Fetched, Read-Only) */}
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <label className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center w-24">Egg ID</label>
                <input
                  className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md bg-gray-100 cursor-not-allowed"
                  type="text"
                  value={eggList[currentEggIndex]?.eggId || ""}
                  readOnly
                />
              </div>

              {/* Date Input */}
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <label className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center w-24">Date</label>
                <input
                  className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md"
                  type="date"
                  value={eggList[currentEggIndex]?.date || ""}
                  onChange={(e) => {
                    const updatedEggs = [...eggList];
                    updatedEggs[currentEggIndex].date = e.target.value;
                    setEggList(updatedEggs);
                  }}
                  required
                />
              </div>

              {/* Details Input */}
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <label className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center w-24">Details</label>
                <input
                  className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md"
                  type="text"
                  value={eggList[currentEggIndex]?.details || ""}
                  onChange={(e) => {
                    const updatedEggs = [...eggList];
                    updatedEggs[currentEggIndex].details = e.target.value;
                    setEggList(updatedEggs);
                  }}
                  required
                />
              </div>

              {/* Status Input */}
              {/* Status Input */}
              <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <label className="md:bg-[#51A17B]/35 p-2 rounded-md text-[#3A8762] text-center w-24">Status</label>
                <select
                  className="border border-[#3A8762] shadow-lg p-2 w-full rounded-md bg-white"
                  value={eggList[currentEggIndex]?.status || ""}
                  onChange={(e) => {
                    const updatedEggs = [...eggList];
                    updatedEggs[currentEggIndex].status = e.target.value;
                    setEggList(updatedEggs);
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="Retrieved">Retrieved</option>
                </select>
              </div>


              {/* Submit Button */}
              <div className="m-4 flex justify-end">
                <button type="submit" className="bg-white border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
                  {currentEggIndex + 1 === eggList.length ? "Finish" : "Next Egg"}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default EggInformation;

