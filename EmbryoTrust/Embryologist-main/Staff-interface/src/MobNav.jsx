import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";
import { motion } from "framer-motion";

const MobNav = ({ setisOpen, isAuthenticated, handleLogout }) => {
  return (
    <div className="block lg:hidden">
      <div className="fixed inset-0 bg-white px-[20px] py-[20px]">
        <div className="relative h-full">
          <div className="bg-[#480CBF]/20 h-[700px] blur-[200px] w-[700px] rounded-full absolute z-0 left-28 top-0"></div>
          <div className="flex relative z-10 justify-between items-center">
            <Link to="/">
              <div className="flex justify-center items-center gap-2">
                <img className="w-[200px]" src={logo} alt="Logo" />
              </div>
            </Link>
            <XMarkIcon onClick={() => setisOpen(false)} className="w-[35px] text-[#480CBF]" />
          </div>

          <motion.div initial="hidden" whileInView="show" className="lg:pt-[90px] relative z-10">
            <div className="mt-[89px] flex flex-col gap-[36px] items-center">
              <motion.a
                className="bg-[#480CBF] w-full max-w-[400px] h-[35px] font-normal text-[20px] hover:scale-105 duration-300 text-white rounded-lg text-center"
                href="#aboutus"
                onClick={() => setisOpen(false)}
              >
                About Us
              </motion.a>
              <motion.a
                className="bg-[#480CBF] w-full max-w-[400px] h-[35px] font-normal text-[20px] hover:scale-105 duration-300 text-white rounded-lg text-center"
                href="#features"
                onClick={() => setisOpen(false)}
              >
                Our Features
              </motion.a>
              <motion.a
                className="bg-[#480CBF] w-full max-w-[400px] h-[35px] font-normal text-[20px] hover:scale-105 duration-300 text-white rounded-lg text-center"
                href="#contactus"
                onClick={() => setisOpen(false)}
              >
                Contact Us
              </motion.a>

              {isAuthenticated ? (
                <motion.button
                  onClick={() => {
                    handleLogout();
                    setisOpen(false);
                  }}
                  className="bg-red-600 w-full max-w-[400px] h-[35px] font-normal text-[20px] hover:scale-105 duration-300 text-white rounded-lg"
                >
                  Log Out
                </motion.button>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#480CBF] w-full max-w-[400px] h-[35px] font-normal text-[20px] hover:scale-105 duration-300 text-white rounded-lg text-center"
                  onClick={() => setisOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MobNav;
