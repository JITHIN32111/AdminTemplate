import React from "react";
import img from "../assets/authImg.png";



function SidePortionInAuth() {

        return (
    <>
      <div className=" flex-col w-1/2 hidden md:flex  items-center  mr-10">
        <span className="    flex flex-col  font-bold justify-end items-start text-white text-2xl md:text-3xl lg:text-4xl pt-16 pl-20">
          <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-transparent">
          Manage Your Platform {" "}
          </span>
          <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 mt-2 bg-clip-text text-transparent">
          Efficiently
          </span>
        </span>

        <img
    
          src={img}
          alt=""
          className="w-auto  lg:h-[400px] h-auto "
        />
      </div>
    </>
  );
}

export default SidePortionInAuth;