import React, { useContext, useEffect, useState } from 'react';
import home from "../../assets/home.png";
import { Link, useParams } from 'react-router-dom';
import StatesContext from '../../../context/StatesContext';

const Embryo = () => {
  const { patientId } = useParams();
  const { getEmbryoByPatientId } = useContext(StatesContext);
  const [embInfo, setEmbInfo] = useState(null);
// console.log(embInfo)
  useEffect(() => {
    const fetchEggInfo = async () => {
      try {
        const data = await getEmbryoByPatientId(patientId);
        setEmbInfo(data);
      } catch (error) {
        console.error("Failed to fetch patient tests", error);
      }
    };
    fetchEggInfo();
  }, [getEmbryoByPatientId, patientId]);

  return (
    <div>
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        {/* Patient ID */}
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID : {patientId}</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          <Link
            to={`/embryo-info/${patientId}`}
            className="rounded-lg px-3 py-2 text-sm md:text-base text-center bg-[#51A17B] text-white shadow-lg transition-all duration-300"
          >
            Embryo Info
          </Link>
        </div>

        {/* Home Button */}
        <Link className='flex justify-end w-full lg:w-fit items-center' to="/patient-list">
          <img className="h-5 md:h-6" src={home} alt="Home" />
        </Link>
      </div>

      <div className='mt-24 mb-8 px-4'>
        <div className="border w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full text-center md:w-[30%] rounded-md">
              Embryo Information
            </h2>
          </div>
          <div className="px-4 md:px-8 mt-4">
  {[
    { label: "Embryo Id", key: "embryoId", type: "text" },
    { label: "Fertilizer Date", key: "fertilizationDate", type: "text" },
    { label: "Status", key: "status", type: "text" },
  ].map(({ label, key, type }) => (
    <div key={key} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
      <div className="w-full md:w-[400px]">
        <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
          {label}
        </h1>
      </div>
      <input
        className="border border-[#3A8762] shadow-lg text-[#3A8762] p-2 w-full rounded-md"
        type={type}
        value={
          embInfo
            ? key === "fertilizationDate" && embInfo[key]
              ? new Date(embInfo[key]).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : embInfo[key] || ""
            : ""
        }
        readOnly
      />
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default Embryo;
