import React, { useEffect, useState, useContext } from 'react';
import home from "../../assets/home.png";
import { Eye, Download, Printer } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import StatesContext from '../../../context/StatesContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Records = () => {
  const { patientId } = useParams();
  console.log(patientId);
  const { getPatientTests } = useContext(StatesContext);
  const [tests, setTests] = useState({
    bloodTests: [],
    eggInformation: [],
    Embryo: []
  });
  console.log(tests);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const fetchPatientTest = async () => {
      try {
        const data = await getPatientTests(patientId) || {};
        setTests({
          bloodTests: data.bloodTests || [],
          Embryo: data.Embryo || [],
          ultrasoundTests: data.ultrasoundTests || [],
        });
      } catch (error) {
        console.error("Failed to fetch patient tests", error);
      }
    };
    fetchPatientTest();
  }, [getPatientTests, patientId]);

  const handleViewReport = (test) => {
    setSelectedTest(test);
  };
  // console.log(selectedTest);
  const generateReport = (test) => {
    if (!test) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("EmbryoTrust Electronic Medical Records System", pageWidth / 2, 15, { align: "center" });

    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Secure & Blockchain-Protected Medical Records", pageWidth / 2, 22, { align: "center" });

    doc.setFont("helvetica", "normal");

    // Patient Information Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 14, 35);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient ID: ${test.patientId}`, 14, 42);
    doc.text(`Record Type: ${test.Name || "Unknown"}`, 14, 48);
    doc.text(`Test Date: ${new Date(test.testDate).toLocaleDateString()}`, 14, 54);

    // Add a line separator
    doc.setDrawColor(0);
    doc.line(14, 58, pageWidth - 14, 58);

    // Test Details Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Test Details", 14, 66);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const testData = [
      ["Block Hash", test.hash],
      ["Result", test.result || "N/A"],
      ["Additional Info", test.additionalInfo || "None"]
    ];

    doc.autoTable({
      startY: 72,
      head: [["Parameter", "Value"]],
      body: testData,
      theme: "striped",
    });

    // Security & Blockchain Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Security & Blockchain Verification", 14, doc.autoTable.previous.finalY + 10);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("This document is securely stored and verified using blockchain technology.", 14, doc.autoTable.previous.finalY + 16);
    doc.text("Data integrity and security ensured by EmbryoTrust.", 14, doc.autoTable.previous.finalY + 22);

    return doc;
  };

  const handlePrint = (test) => {
    if (!test) return;
    const doc = generateReport(test);
    doc.autoPrint();
    doc.output("dataurlnewwindow");
  };

  const handleDownload = (test) => {
    if (!test) return;
    const doc = generateReport(test);
    doc.save(`Medical_Report_${test._id}.pdf`);
  };

  return (
    <div className="w-full mx-auto ">
      {/* Record Info Section */}
      <div className="bg-[#51A17B]/30 flex flex-col lg:flex-row gap-2 justify-between items-center py-3 px-4 md:px-6 rounded-lg">
        {/* Patient ID */}
        <div className="bg-white w-full lg:w-auto rounded-lg p-4 text-[#51A17B] shadow-md">
          <h1 className="text-center text-sm md:text-base font-medium">Patient ID : {patientId}</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2">
          {[
            //  { path: "/patient-info", label: "Profile Info" },
            { path: `/records/${patientId}`, label: "Medical Results", active: true },
            { path: `/egg-info/${patientId}`, label: "Egg Info" },
            { path: `/blood-test/${patientId}`, label: "Blood Test" },
            { path: `/ultrasound/${patientId}`, label: "UltraSound" },
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

      <div className="border mt-10 w-full max-w-4xl mx-auto border-green-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full rounded-b-3xl border-collapse">
            <thead>
              <tr className="bg-[#51A17B]/70 text-white text-left">
                <th className="p-4">Record ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Result</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tests?.bloodTests?.map((test, index) => (
                <tr key={test._id || index} className={`border ${index % 2 === 0 ? "bg-[#51A17B]/35" : "bg-white"}`}>
                  <td className="p-4 font-bold">{test._id?.slice(0, 6)}</td>
                  <td className="p-4">{test.Name}</td>
                  <td className="p-4">{test.result || "Unknown Blood Test"}</td>
                  <td className="p-4">{new Date(test.testDate).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3">
                    {/* <Eye className="cursor-pointer hover:text-green-700" onClick={() => handleViewReport(test)} /> */}
                    <Download className="cursor-pointer hover:text-green-700" onClick={() => handleDownload(test)} />
                    <Printer className="cursor-pointer hover:text-green-700" onClick={() => handlePrint(test)} />
                  </td>
                </tr>
              ))}

              {!tests?.bloodTests?.length && (
                <tr className="border bg-white">
                  <td className="p-4 text-center text-gray-500" colSpan="5">No records available</td>
                </tr>
              )}
              {tests?.Embryo?.map((test, index) => (
                <tr key={test._id || index} className={`border ${index % 2 === 0 ? "bg-[#51A17B]/35" : "bg-white"}`}>
                  <td className="p-4 font-bold">{test.embryoId}</td>
                  <td className="p-4">Egg Evaluation</td>
                  <td className="p-4"> {test.status || "Unknown Blood Test"}</td>
                  <td className="p-4">{new Date(test.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3">
                    {/* <Eye className="cursor-pointer hover:text-green-700" onClick={() => handleViewReport(test)} /> */}
                    <Download className="cursor-pointer hover:text-green-700" onClick={() => handleDownload(test)} />
                    <Printer className="cursor-pointer hover:text-green-700" onClick={() => handlePrint(test)} />

                  </td>
                </tr>
              ))}
              {!tests?.Embryo?.length && (
                <tr className="border bg-white">
                  <td className="p-4 text-center text-gray-500" colSpan="5">No records available</td>
                </tr>
              )}
              {tests?.ultrasoundTests?.map((test, index) => (
                <tr key={test._id || index} className={`border ${index % 2 === 0 ? "bg-[#51A17B]/35" : "bg-white"}`}>
                  <td className="p-4 font-bold">{test._id?.slice(0, 6)}</td>
                  <td className="p-4">{test.Name}</td>
                  <td className="p-4">{test.result || "Unknown Blood Test"}</td>
                  <td className="p-4">{new Date(test.testDate).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3">
                    {/* <Eye className="cursor-pointer hover:text-green-700" onClick={() => handleViewReport(test)} /> */}
                    <Download className="cursor-pointer hover:text-green-700" onClick={() => handleDownload(test)} />
                    <Printer className="cursor-pointer hover:text-green-700" onClick={() => handlePrint(test)} />

                  </td>
                </tr>
              ))}
              {!tests?.ultrasoundTests?.length && (
                <tr className="border bg-white">
                  <td className="p-4 text-center text-gray-500" colSpan="5">No records available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Records
