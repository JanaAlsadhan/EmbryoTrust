import React, { useContext, useEffect, useState } from "react";
import { Link  , useNavigate} from "react-router-dom";
import user from "../assets/user.png"
import StatesContext from "../../context/StatesContext";
const Profile = () => {
  const { state, updateDoctor, getDoctorByDoctorId, logout } = useContext(StatesContext);
   const navigate = useNavigate();
  // State for updating email and phone number
  const [doctor, setDoctor] = useState({});
  const [email, setEmail] = useState(doctor.email);
  const [phoneNumber, setPhoneNumber] = useState(doctor.phoneNumber);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleUpdate = async () => {
    try {
      // Call updateDoctor function with new data
      await updateDoctor(state.doctor.doctorId, { email, phoneNumber });

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating doctor details:", error);
    }
  };


  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const doctorId = state.doctor.doctorId
      if (!doctorId) return; // Prevent unnecessary API calls if patientId is undefined

      try {
        const data = await getDoctorByDoctorId(doctorId); // Fetch patient data
        setDoctor(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchDoctorProfile();
  }, [state.doctor, getDoctorByDoctorId]);

  const details = [
    { label: "Doctor ID", value: doctor.doctorId },
    { label: "Name", value: doctor.name },
    { label: "Date Of Birth", value: doctor.dob ? new Date(state.doctor.dob).toLocaleDateString() : "N/A" },
    { label: "Gender", value: doctor.gender },
    { label: "Specialty", value: doctor.speciality },
  ];

  return (
    <div>
      <div className="p-2 bg-[#F5F0FF] border border-[#480CBF] flex flex-col md:flex-row justify-between items-center gap-2 rounded-lg shadow-md">
        {/* Left Section: User Image & Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="p-1 rounded-lg border border-[#480CBF] shadow-sm">
            <img className="w-[70px] md:w-[90px]" src={user} alt="User" />
          </div>
          {[
            { path: "/doctor-profile", label: "Profile Info", primary: true },
            { path: "/patient-list", label: "Patient List", primary: false },
          ].map(({ path, label, primary }) => (
            <Link
              key={path}
              to={path}
              className={`w-full md:w-[200px] text-center rounded-lg py-2 text-[15px] md:text-[18px] transition-all duration-300 shadow-md ${primary
                ? "bg-[#480CBF] text-white hover:scale-105"
                : "border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section: Settings & Logout */}
        <div className="grid grid-cols-2 md:flex flex-col items-center gap-2 w-full md:w-auto">
          {["Settings", "Log out"].map((label) => (
            <button
              key={label}
              onClick={label === "Log out" ? logout : ()=> navigate("/updatepassword")} // Attach the function only to "Log out"
              className="w-full md:w-[100px] text-center rounded-lg py-2 text-[15px] md:text-[18px] border border-[#480CBF] text-[#480CBF] hover:bg-[#EDE3FF] hover:scale-105 transition-all duration-300 shadow-md"
            >
              {label}
            </button>
          ))}
        </div>
      </div>



      <div className="bg-[#F5F0FF] lg:mx-auto mt-20 mx-4 lg:w-[60%] font-lock rounded-xl flex flex-col gap-4 items-center justify-center p-2 md:p-8 border border-[#480CBF]">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-3"
          >
            {/* Label */}
            <div className="p-1 text-[22px] md:text-[28px] leading-[30px] md:shadow-lg rounded-md md:bg-white text-[#480CBF]">
              <h1 className="w-[229px] text-left md:text-center">{item.label}</h1>
            </div>

            {/* Input or Select based on Gender Field */}

            <input
              disabled
              value={item.value}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-[22px] leading-[25px]"
            />

          </div>
        ))}

        <div className="mt-3 border w-full rounded-xl border-[#480CBF] p-6">
          {/* Email Field */}
          <div className="flex flex-col md:flex-row justify-center w-full items-center gap-3">
            <div className="p-2 text-lg md:text-xl md:shadow-lg rounded-md mr-auto md:mr-0 md:bg-white text-[#480CBF] w-full md:w-[230px] md:text-center">
              Email Address
            </div>
            <input
              name="email"
              value={email || doctor.email}
              onChange={handleChange}
              disabled={!isEditing}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-lg md:text-xl"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col md:flex-row justify-center mt-6 w-full items-center gap-3">
            <div className="p-2 text-lg md:text-xl md:shadow-lg rounded-md mr-auto md:mr-0 md:bg-white text-[#480CBF] w-full md:w-[230px] md:text-center">
              Phone Number
            </div>
            <input
              name="phoneNumber"
              value={phoneNumber || doctor.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              type="text"
              className="w-full text-[#480CBF] shadow-lg rounded-md p-2 bg-white text-lg md:text-xl"
            />
          </div>

          {/* Edit & Save Buttons */}
          <div className="flex justify-end mt-4">
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-[#480CBF] text-white border border-[#480CBF] rounded-full text-lg font-medium transition duration-300 hover:bg-[#370899]"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-white text-[#480CBF] border border-[#480CBF] rounded-full text-lg font-medium transition duration-300 hover:bg-[#480CBF] hover:text-white"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
