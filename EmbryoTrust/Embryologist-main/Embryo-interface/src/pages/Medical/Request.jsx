import React from "react";
import { Eye, Download, Printer, Home } from "lucide-react";
import home from "../../assets/home.png";
// import home from "../../";
import { Link } from "react-router-dom";

const Request = () => {
  const records = [
    { id: 12402, type: "Eggs Evaluation", name: "Results", date: "10/09/2024" },
  ];

  return (
    <div className="w-full mx-auto ">
      {/* Record Info Section */}
      <div className="border border-[#3A8762] bg-[#51A17B]/35 rounded-lg shadow-md flex items-center justify-between px-4 py-2">
        {/* Header */}
        <div className="w-full relative flex flex-row lg:flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center w-full lg:w-[70%] mx-auto text-white bg-[#51A17B]/70 gap-3 justify-between p-3 rounded-lg shadow-md text-[12px] md:text-[14px]">
            <span className="font-semibold bg-white p-2 text-center text-[#3A8762] rounded-lg">
              Record ID
            </span>
            <span className="font-semibold bg-white p-2 text-center text-[#3A8762] rounded-lg">
              Type
            </span>
            <span className="font-semibold bg-white p-2 text-center text-[#3A8762] rounded-lg">
              Name
            </span>
            <span className="font-semibold bg-white p-2 text-center text-[#3A8762] rounded-lg">
              Date
            </span>
            <span className="font-semibold bg-white p-2 text-center text-[#3A8762] rounded-lg">
              Action
            </span>
          </div>

          {/* Record Data */}
          {records.map((record) => (
            <div
              key={record.id}
              className="grid grid-cols-1 lg:grid-cols-5 justify-center items-center font-semibold text-[12px] md:text-[14px] leading-[20px] w-full lg:w-[70%] mx-auto p-3 rounded-lg"
            >
              <span className="font-bold">{record.id}</span>
              <span>{record.type}</span>
              <span>{record.name}</span>
              <span>{record.date}</span>
              <div className="flex gap-3">
                <Eye className="cursor-pointer hover:text-green-700 text-sm" />
                <Download className="cursor-pointer hover:text-green-700 text-sm" />
                <Printer className="cursor-pointer hover:text-green-700 text-sm" />
              </div>
            </div>
          ))}

          <Link className="lg:hidden absolute z-20 bottom-2 right-2" to="/patient-info">
            <img className="h-[30px]" src={home} alt="Home" />
          </Link>
        </div>

        {/* Home Icon - Positioned on the Right */}
        <Link to="/patient-info">
          <img className="h-[30px] hidden lg:block" src={home} alt="Home" />
        </Link>
      </div>

      {/* Egg Information Section */}
      <div className="px-4">
        <div className="border  w-full max-w-4xl mx-auto border-green-700 mt-12 rounded-lg shadow-md">
          <div className="p-4 bg-[#51A17B]/70 flex md:justify-start justify-center">
            <h2 className="bg-white text-[#3A8762] font-semibold p-4 md:mr-auto w-full  text-center md:w-[30%]  rounded-md">
              Egg Information
            </h2>
          </div>

          <div className="px-4 md:px-8 mt-4">
            {[
              { label: "Egg ID", type: "text" },
              { label: "Collection Date", type: "date" },
              { label: "Status", type: "text" },
              { label: "Details", type: "text" },
            ].map(({ label, type }) => (
              <div key={label} className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 mt-4">
                <div className="w-full md:w-[300px]">
                  <h1 className="md:bg-[#51A17B]/35 md:w-auto w-fit p-2 rounded-md text-[#3A8762] text-center text-[16px] md:text-[20px]">
                    {label}
                  </h1>
                </div>
                <input className="border text-[#3A8762] p-2 w-full rounded-md" type={type} />
              </div>
            ))}
          </div>

          {/* Fertilization Request */}
          <div className="m-4 flex flex-wrap md:flex-nowrap justify-end items-center">
            <p className="mr-2 font-bold">Want to start fertilization?</p>
            <button className="bg-white mt-2 md:mt-0 border border-[#480CBF] text-[#480CBF] px-4 py-2 rounded-md hover:bg-[#480CBF]/40">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
