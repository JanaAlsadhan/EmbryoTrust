import { useState, useEffect } from "react";
import StatesContext from "./StatesContext";
import axios from "axios";
import { BACKEND_URL } from "../src/constant/index";
import { create as ipfsHttpClient } from "ipfs-http-client";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Buffer } from "buffer";



// config for upload IPFS File & Imges
const projectId = "2XQdZnzmeBfPCMMaGWq8GnagfPw";
const projectSecrtKey = "7b281e41879edc7f80f50127f484eb34";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecrtKey}`).toString("base64")}`;

const subdomain = "https://codevvertix-nftmarketplace.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    }
})

const uploadToIpfs = async (file) => {
    try {
        const added = await client.add({ content: file });
        const url = `${subdomain}/ipfs/${added.path}`;
        console.log(url)
        return url;
    } catch (error) {
        console.log("error  => ", error)
    }
}


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
    const testDate = test.testDate ? new Date(test.testDate) : new Date();
    doc.text(`Test Date: ${testDate.toLocaleDateString()}`, 14, 54);
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
        ["Test Value", test.hcgLevel || test.testType],
        ["Result", test.result || "N/A"],
        ["Additional Info", test.remarks || "None"]
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















const OverAllStates = (props) => {


    // const [state, setState] = useState(defaultStates);
    const [state, setState] = useState(() => {
        const storedDoctor = localStorage.getItem("doctor");
        const storedToken = localStorage.getItem("token");

        return storedDoctor && storedDoctor
            ? { doctor: JSON.parse(storedDoctor), token: storedToken, success: true, error: null }
            : { doctor: null, token: null, success: false, error: null };
    });

    // Function to update the state dynamically
    const handleStateChange = (value) => {
        setState((prev) => ({
            ...prev,
            ...value,
        }));
    };


    const doctorlogin = async (credentials) => {
        console.log(credentials)
        try {
            const res = await axios.post(`${BACKEND_URL}/doctor/dlogin`, credentials, { withCredentials: true });

            // Store in localStorage
            localStorage.setItem("doctor", JSON.stringify(res.data.doctor)); // Storing user details
            localStorage.setItem("token", res.data.token); // Storing token

            handleStateChange({
                doctor: res.data.doctor,
                token: res.data.token,
                success: true,
                error: null,
            });

            return { success: true, doctor: res.data.doctor };
        } catch (error) {
            console.error("Login failed:", error.response?.data?.error || error.message);
            handleStateChange({ error: error.response?.data?.error || "Login failed", success: false });

            return { success: false, error: error.response?.data?.error || "Login failed" };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });

            // Clear localStorage
            localStorage.removeItem("doctor");
            localStorage.removeItem("token");

            // Reset state
            handleStateChange({
                doctor: null,
                token: null,
                success: false,
                error: null,
            });

            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.error || error.message);
        }
    };


    const updateDoctor = async (doctorId, { email, phoneNumber }) => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }

            if (!email || !phoneNumber) {
                throw new Error("Email or Phone Number is missing");
            }



            const response = await axios.put(
                `${BACKEND_URL}/doctor/${doctorId}`,
                { email, phoneNumber },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Failed to update patient:", error.response?.data || error);
            throw error;
        }
    };


    const getDoctorByDoctorId = async (doctorId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.get(`${BACKEND_URL}/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const allPatient = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/patient/`);
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const getPatientByPatientId = async (patientId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/patient/${patientId}`);
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const updatePregnancy = async (patientId, pregnancyStatus) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.patch(`${BACKEND_URL}/patient/pregnancy/${patientId}`, { pregnancyStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };



    //   const createBloodTest = async (bloodData) => {
    //     // console.log(bloodData)
    //     try {
    //         const token = localStorage.getItem("token");

    //         if (!token) {
    //             throw new Error("No token found in localStorage");
    //         }
    //         const response = await axios.post(`${BACKEND_URL}/blood/`, bloodData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         console.log(response.data.data)

    //         return response.data.data;
    //     } catch (error) {
    //         console.error("Failed to create doctor:", error.response?.data || error);
    //         throw error;
    //     }
    //   };




    const createBloodTest = async (bloodData) => {
        // console.log(bloodData)
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found in localStorage");
            }

            // Step 1: Generate PDF Report
            const pdfDoc = generateReport(bloodData);
            const pdfBlob = pdfDoc.output("blob"); // Convert PDF to Blob

            // Step 2: Upload PDF to IPFS
            const pdfFile = new File([pdfBlob], `BloodTest_${bloodData.patientId}.pdf`, { type: "application/pdf" });

            const ipfsUrl = await uploadToIpfs(pdfFile);
            if (!ipfsUrl) throw new Error("Failed to upload PDF to IPFS");

            console.log("PDF uploaded to IPFS:", ipfsUrl);

            // Step 3: Add IPFS URL to bloodData
            const updatedBloodData = { ...bloodData, ipfsUrl };

            // Step 4: Store blood test in the database
            const response = await axios.post(`${BACKEND_URL}/blood/`, updatedBloodData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Blood test created:", response.data.data);
            return response.data.data;

        } catch (error) {
            console.error("Failed to create blood test:", error.response?.data || error);
            throw error;
        }
    };




    const createUltrasoundTest = async (Data) => {
        console.log(Data)
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found in localStorage");
            }

            // Step 1: Generate PDF Report
            const pdfDoc = generateReport(Data);
            const pdfBlob = pdfDoc.output("blob"); // Convert PDF to Blob

            // Step 2: Upload PDF to IPFS
            const pdfFile = new File([pdfBlob], `UltrasoundTest_${Data.patientId}.pdf`, { type: "application/pdf" });

            const ipfsUrl = await uploadToIpfs(pdfFile);
            if (!ipfsUrl) throw new Error("Failed to upload PDF to IPFS");

            console.log("PDF uploaded to IPFS:", ipfsUrl);

            // Step 3: Add IPFS URL to Data
            const updatedData = { ...Data, ipfsUrl };

            // Step 4: Store ultrasound test in the database
            const response = await axios.post(`${BACKEND_URL}/ultrasound/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Ultrasound test created:", response.data.data);
            return response.data.data;

        } catch (error) {
            console.error("Failed to create ultrasound test:", error.response?.data || error);
            throw error;
        }
    };


    const createMedication = async (Data) => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.post(`${BACKEND_URL}/medication/`, Data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };


    const createEggInfo = async (Data) => {
        const { patientId, retrievedEggs } = Data;
        //   console.log(patientId, retrievedEggs)
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.post(`${BACKEND_URL}/egginfo/`, { patientId, retrievedEggs },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const getEggInfoByPatientId = async (patientId) => {
        // console.log(patientId)
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.get(`${BACKEND_URL}/egginfo/${patientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)

            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const getAllEggInfoByPatientId = async (patientId) => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.get(`${BACKEND_URL}/egginfo/all/${patientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const doctorComfrimation = async (eggId) => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.post(`${BACKEND_URL}/egginfo/doctorcomfrimation/${eggId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message) {
                alert("FCR  Doctors Confrimation of Fertilzation")
            }

            return response.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const doctorDney = async (eggId) => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.post(`${BACKEND_URL}/egginfo/doctorcomfrimation/dney/${eggId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message) {
                alert("FCR  Doctors Dnied-Confrimation of Fertilzation")
            }

            return response.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const supermsVerification = async (patientId, eggId, husbandId) => {
        console.log(patientId, eggId, husbandId);
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }
            const response = await axios.patch(`${BACKEND_URL}/egginfo/verification/${patientId}/${eggId}/${husbandId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };


    const getEmbryoByPatientId = async (patientId) => {
        try {

            const response = await axios.get(`${BACKEND_URL}/embryo/${patientId}`);
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const updateEmbro = async (patientId, updatedData ) => {
        try {
            console.log(patientId, updatedData )
            // const response = await axios.put(`${BACKEND_URL}/embryo/${patientId}`, updatedData);
            // return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };


    const getPatientTests = async (patientId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/patient/tests/${patientId}`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    const updateEggInformation = async (eggId, attachReason) => {
        console.log(eggId, attachReason);
        try {
            const response = await axios.put(`${BACKEND_URL}/egginfo`, { eggId, attachReason });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };


    return (
        <StatesContext.Provider value={{
            state, handleStateChange, doctorlogin, logout, updateDoctor, getDoctorByDoctorId, getPatientByPatientId, updatePregnancy,
            createBloodTest, createUltrasoundTest, createMedication, createEggInfo, getEggInfoByPatientId, supermsVerification,
            getEmbryoByPatientId, updateEmbro,
            allPatient, doctorComfrimation, getPatientTests, getAllEggInfoByPatientId, doctorDney, updateEggInformation

        }}>
            {props.children}
        </StatesContext.Provider>
    );
};

export default OverAllStates;

