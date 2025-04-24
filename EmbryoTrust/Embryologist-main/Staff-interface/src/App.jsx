// import React from "react"
// import NavBar from "./Navbar"
// import { Route, Routes } from "react-router-dom"
// import Banner from "./component/Banner"





// function App() {
 

//   return (
//  <>
//  <div   className="     ">
 
//  <div className="absolute z-10  bg-color w-full flex justify-center items-center bottom-0 h-[100px]">
// <p className='text-[white] text-center w-full font-lock font-semibold text-[24px]  leading-[32px]'>
//       Trust in Every Click, Security in Each Record
//       </p>
// </div>

//  <div className=" z-20 pb-20 relative h-full px-4  md:px-8      ">
 
//  <NavBar/>
//  <Banner/>

// </div>
// </div>

//  </>
//   )
// }

// export default App


import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar";
import Banner from "./component/Banner";
import StatesContext from "../context/StatesContext"; // Import context

function App() {
  const { state } = useContext(StatesContext); // Get state from context
 console.log(state);
  return (
    <>
      <div>
        <div className="absolute z-10 bg-color w-full flex justify-center items-center bottom-0 h-[100px]">
          <p className="text-white text-center w-full font-lock font-semibold text-[24px] leading-[32px]">
            Trust in Every Click, Security in Each Record
          </p>
        </div>

        <div className="z-20 pb-20 relative h-full px-4 md:px-8">
          <NavBar />
          <Banner />
          
          {/* Example: Show user info if logged in */}
          {state.user ? (
            <h2 className="text-center mt-4 text-green-500">
              Welcome, {state.user.firstName} {state.user.lastName}
            </h2>
          ) : (
            <h2 className="text-center mt-4 text-red-500">Please log in</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
