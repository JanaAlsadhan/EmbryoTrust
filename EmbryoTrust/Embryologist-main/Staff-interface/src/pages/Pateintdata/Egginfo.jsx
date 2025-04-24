import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import home from "../../assets/home.png";
import StatesContext from '../../../context/StatesContext';

const Egginfo = () => {
  const { patientId } = useParams();
  const { getEggInfoByPatientId } = useContext(StatesContext);
  const [egIgnfo, setEggInfo] = useState(null);

  useEffect(() => {
    const fetchEggInfo = async () => {
      try {
        const data = await getEggInfoByPatientId(patientId);
        setEggInfo(data);

        setFormData({
          eggID: data.eggId || "",
          collectionDate: data.collectionDate ? new Date(data.collectionDate).toLocaleDateString() : "",
          status: data.status || "",
          details: data.retrievedEggs ? `Retrieved Eggs: ${data.retrievedEggs}` : "",
          patientRequest: data.patientRequest || "",
          reason: data.attachReason || "",
        });

      } catch (error) {
        console.error("Failed to fetch patient tests", error);
      }
    };

    fetchEggInfo();
  }, [getEggInfoByPatientId, patientId]);

  const [formData, setFormData] = useState({
    eggID: "",
    collectionDate: "",
    status: "",
    details: "",
    patientRequest: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    { label: "Egg ID", type: "text", name: "eggID" },
    { label: "Collection Date", type: "text", name: "collectionDate" },
    { label: "Status", type: "text", name: "status" },
    { label: "Details", type: "text", name: "details" },
    { label: "Patient's Request", type: "text", name: "patientRequest" },
    { label: "Attach A Reason", type: "text", name: "reason" },
  ];

  return (
    <div>
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID : {patientId}</h1>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          <Link to={`/egg-info/${patientId}`} className="rounded-lg px-3 py-2 text-sm md:text-base text-center bg-[#51A17B] text-white shadow-lg transition-all duration-300">
            Egg Info
          </Link>
        </div>

        <Link className='flex justify-end w-full lg:w-fit items-center' to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      <div className='mt-24 mb-8 px-4'>
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Egg Information
            </h2>
          </div>

          <div className="px-4 md:px-8 my-4">
            {fields.map(({ label, type, name }) => (
              <div key={name} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[300px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    {label}
                  </h1>
                </div>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border text-[#3A8762] p-2 w-full rounded-md"
                  type={type}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Egginfo;

