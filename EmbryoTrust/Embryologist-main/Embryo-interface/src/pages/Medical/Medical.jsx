import React, { useContext } from "react";
import { Eye, Download, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import StatesContext from "../../../context/StatesContext";
import user from "../../assets/user.png";


const Medical = () => {
  const { state, logout  ,allPatient} = useContext(StatesContext);
  const records = [
    { id: 12401, type: "Blood Test", name: "HCG Test", date: "10/10/2024" },
    { id: 12402, type: "Eggs Evaluation", name: "Results", date: "10/09/2024" },
    { id: 12403, type: "Blood Test", name: "HCG Test", date: "10/08/2024" },
    { id: 12404, type: "Blood Test", name: "HCG Test", date: "10/07/2024" },
    { id: 12405, type: "UltraSound", name: "Abdominal Ultrasound", date: "2/07/2024" },
    { id: 12406, type: "Blood Test", name: "HCG Test", date: "27/06/2024" },
  ];

  return (
    
    <div className="border w-full max-w-4xl mx-auto border-green-700 rounded-lg p-4">
         <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row justify-between items-center gap-2 rounded-lg shadow-md">
        {/* Left Section: User Image & Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
            <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
          </div>
          {[
            // { path: "/doctor-profile", label: "Profile Info", primary: true },
            { path: "/doctor-profile", label: `${state.doctor?.speciality}`, primary: false },
            { path: "/patient-list", label: "Patient List", primary: false },
          ].map(({ path, label, primary }) => (
            <Link
              key={path}
              to={path}
              className={`w-full md:w-[200px] text-center rounded-lg py-2 text-[15px] md:text-[18px] transition-all duration-300 shadow-md ${
                primary
                  ? "border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105"
                  : " bg-[#480CBF] text-white hover:scale-105"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      
        {/* Right Section: Settings & Logout */}
        <div className="grid grid-cols-2 md:flex flex-col items-center gap-2 w-full md:w-auto">
                {["Settings", "Log out" ].map((label) => (
                  <button
                    key={label}
                    onClick={label === "Log out" ? logout : undefined} // Attach the function only to "Log out"
                    className="w-full md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    {label}
                  </button>
                ))}
              </div>
      </div>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="p-4">Record ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={`border ${index % 2 === 0 ? "bg-[#51A17B]/35" : "bg-white"}`}
              >
                <td className="p-4 font-bold">{record.id}</td>
                <td className="p-4">{record.type}</td>
                <td className="p-4">{record.name}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4 flex gap-3">
                  <Link to="/request">
                    <Eye className="cursor-pointer hover:text-green-700" />
                  </Link>
                  <Download className="cursor-pointer hover:text-green-700" />
                  <Printer className="cursor-pointer hover:text-green-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medical;
