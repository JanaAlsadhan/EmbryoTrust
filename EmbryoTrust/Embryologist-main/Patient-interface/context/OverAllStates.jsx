import { useState, useEffect } from "react";
import StatesContext from "./StatesContext";
import axios from "axios";
import { BACKEND_URL } from "../src/constant/index";

const OverAllStates = (props) => {


    // const [state, setState] = useState(defaultStates);
    const [state, setState] = useState(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        return storedUser && storedToken
            ? { user: JSON.parse(storedUser), token: storedToken, success: true, error: null }
            : { user: null, token: null, success: false, error: null };
    });

    // Function to update the state dynamically
    const handleStateChange = (value) => {
        setState((prev) => ({
            ...prev,
            ...value,
        }));
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


    const getEggInfoByPatientId = async (patientId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/egginfo/${patientId}`);
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };


    const getAllEggInfoByPatientId = async (patientId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/egginfo/all/${patientId}`);
            // console.log(response.data)
            return response.data.data;
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


    


    const updatePatient = async (patientId, { email, phoneNumber }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }

            if (!email || !phoneNumber) {
                throw new Error("Email or Phone Number is missing");
            }



            const response = await axios.put(
                `${BACKEND_URL}/patient/${patientId}`,
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

    const confrimPatientRequest = async (eggId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found in localStorage");
            }

            const response = await axios.post(
                `${BACKEND_URL}/egginfo/patientrequest/${eggId}`, {},
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







    // 🔹 Login Function (Reusable for Admin, Patient, and Doctor)
    const patientlogin = async (credentials) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/patient/login`, credentials, { withCredentials: true });

            // Store in localStorage
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Storing user details
            localStorage.setItem("token", res.data.token); // Storing token

            handleStateChange({
                user: res.data.user,
                token: res.data.token,
                success: true,
                error: null,
            });

            return { success: true, user: res.data.user };
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
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Reset state
            handleStateChange({
                user: null,
                token: null,
                success: false,
                error: null,
            });

            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.error || error.message);
        }
    };

    const getMedicalSheudle = async (patientId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/medication/${patientId}`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to create doctor:", error.response?.data || error);
            throw error;
        }
    };

    

    return (
        <StatesContext.Provider value={{
            state,
            handleStateChange,
            patientlogin,
            logout,
            getPatientByPatientId,
            updatePatient,
            getEggInfoByPatientId,
            confrimPatientRequest,
            getPatientTests,
            getMedicalSheudle,
            getAllEggInfoByPatientId
        }}>
            {props.children}
        </StatesContext.Provider>
    );
};

export default OverAllStates;

