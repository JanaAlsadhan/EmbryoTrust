import React, { useContext, useEffect, useState } from 'react';
import home from "../../assets/home.png";
import { Link, useParams } from 'react-router-dom';
import StatesContext from '../../../context/StatesContext';

const Embryo = () => {
  const { patientid } = useParams();
  const { getEmbryoByPatientId, updateEmbro } = useContext(StatesContext);

  const [embryoInfo, setEmbryoInfo] = useState({});


  const [formData, setFormData] = useState({
    embryo: "",
    fertilizerDate: "",
    status: "",
  });

  console.log(formData)


  // Fetch embryo info and update formData
  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const data = await getEmbryoByPatientId(patientid);
        setEmbryoInfo(data);

        // Convert fertilizationDate to a readable format (YYYY-MM-DD)
        const formattedDate = data.fertilizationDate
          ? new Date(data.fertilizationDate).toISOString().split("T")[0]
          : "";

        // Update formData with formatted date
        setFormData({
          embryo: data.embryoId || "",
          fertilizerDate: formattedDate, // Use formatted date
          status: data.status || "",
        });

      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatientProfile();
  }, [getEmbryoByPatientId, patientid]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const updatedData = {
        embryoId: formData.embryo,
        fertilizationDate: formData.fertilizerDate,
        status: formData.status,
      };

      await updateEmbro(patientid, updatedData); // Call update function

      alert("Embryo details updated successfully!"); // Notify user
    } catch (error) {
      console.error("Error updating embryo details:", error);
      alert("Failed to update embryo details."); // Show error message
    }
  };



  // Fields array
  const fields = [
    { label: "Embryo", type: "text", name: "embryo" },
    { label: "Fertilizer Date", type: "text", name: "fertilizerDate" },
    {
      label: "Status",
      type: "select",
      name: "status",
      options: ["Growing", "Frozen", "Transferred", "Discarded"],
    },
  ];

  return (
    <div>
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">
            Patient ID : {patientid}
          </h1>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          <Link
            to="/embryo-info"
            className="rounded-lg px-3 py-2 text-sm md:text-base text-center bg-[#51A17B] text-white shadow-lg"
          >
            Embryo Info
          </Link>
        </div>

        <Link className="flex justify-end w-full lg:w-fit items-center" to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      <div className="mt-24 mb-8 px-4">
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Embryo Information
            </h2>
          </div>

          <div className="px-4 md:px-8 mt-4">
            {fields.map(({ label, type, name, options }) => (
              <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[400px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    {label}
                  </h1>
                </div>

                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                  >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
                    type={type}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
            <button
              onClick={handleSubmit}
              className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40"
            >
              Submit
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Embryo;
