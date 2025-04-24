import React, { useEffect, useState } from "react";
import logo from "../src/assets/logo.png";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import MobNav from "./MobNav";
import { Link } from "react-router-dom";


const Navbar = () => {
  const links = [
    <Link to='/aboutus'>About US</Link>,
    "tokenomics",
    "Roadmap",
    "Platform Features",
    <Link to='/contactus'>Contact Us</Link>
    
  ];

  const [isOpen, setisOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-lock ">
    
      <div className="flex items-center mt-[24px] justify-between  ">
        <Link to="/"><div className="flex justify-center items-center gap-2">
          <img className=" w-[200px] md:w-[300px]" src={logo} alt="" />
         
        </div>
        </Link>

        {/* <div className="flex  items-center gap-4">
          <div className="grow">
            <div className="hidden scroll-smooth font-Slackey text-[#FFFAFA] lg:flex md:gap-3 lg:gap-[20px] xl:gap-[40px] justify-center">
              {links.map((item, i) => {
                let x = item;
                if (x === "Roadmap") {
                  x = "roadmap";
                }
                if (x === "tokenomics") {
                  x = "tokenomics";
                }
                if (x === "Platform Features") {
                  x = "features";
                }

                

                return (
                  <a
                    key={i}
                    href={`#${x}`}
                    className="text-[#FFF] font-normal font-inter leading-6 scroll-smooth capitalize text-[16px]  underline-offset-8 hover:scale-105 duration-700 cursor-pointer "
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </div> */}
        <div className="lg:flex hidden  justify-center items-center gap-3">
        <button className=" bg-[#F5F0FF] shadow-lg w-[140px] h-[35px]  font-normal leading-7 font-inter text-[20px] hover:scale-105 duration-300  text-[#480CBF] rounded-lg">
          About Us
        </button>
        <button className=" bg-[#F5F0FF] shadow-lg w-[140px] h-[35px]  font-normal leading-7 font-inter text-[20px] hover:scale-105 duration-300  text-[#480CBF] rounded-lg">
          Our Features
        </button>
        <button className=" bg-[#F5F0FF] shadow-lg w-[140px] h-[35px]  font-normal leading-7 font-inter text-[20px] hover:scale-105 duration-300  text-[#480CBF] rounded-lg">
          Contact Us
        </button>
        <Link to="/login" className=" text-center  bg-[#480CBF] w-[140px] h-[35px]  font-normal leading-7 font-inter text-[20px] hover:scale-105 duration-300  text-white rounded-lg">
          Log In
        </Link>
        </div>
        <div className="lg:hidden justify-end items-center gap-2 flex">
          <div className="cursor-pointer" onClick={() => setisOpen(true)}>
            <Bars3BottomRightIcon
              className={`lg:h-[57px] h-[30px] text-[#480CBF] transition-all duration-1000 ease-in-out `}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 h-screen bg-black">
          <MobNav setisOpen={setisOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
