import React, { useState, useEffect, useRef } from "react";
import { ImMenu } from "react-icons/im";
import img from "../../src/assets/mainLogo2.png";
import adminIcon from "../../src/assets/logo02.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
function Header({ open, setOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleProfile = () => {
    console.log("clicked");

    navigate("/admin/edit-profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [dropdownVisible, setDropdownVisible] = useState(false); // Renamed state
  const dropdownRef = useRef(null);
  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <header className="bg-slate-100 text-gray-900 flex justify-between items-center  shadow-sm z-10 w-full fixed top-0 ">
      <div className="flex flex-row gap-x-2 items-center justify-center py-6 xs:py-6 ">
        <div className="flex justify-center items-center gap-x-2">
          <img
            src={img}
            className="cursor-pointer duration-500 md:ml-4 ml-2 w-11 xs:w-12 h-11 xs:h-12"
            alt="Logo"
          />
          <h1 className="font-extrabold text-2xl text-blue-700 hidden md:block">BlizerFI</h1>
        </div>
        <ImMenu className="md:hidden text-blue-600" onClick={() => setOpen(true)} />
      </div>

      <div className="relative sm:mr-6 mr-1" ref={dropdownRef}>
        {/* Admin Icon */}
        <div
          className="flex items-center gap-2 mr-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="hidden sm:block text-base font-medium text-blue-800 ">
            Welcome, Admin
          </span>
          <img
            src={adminIcon}
            className="w-12 h-12   rounded-full "
            alt="Admin Icon"
          />
        </div>

        {/* Dropdown */}
        {dropdownVisible && (
          <div className="absolute right-4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4 bg-blue-700 rounded-md text-white flex items-center gap-2">
              <div>
                <h4 className="font-semibold text-sm">Super Admin</h4>
                  {/* <p className="text-xs">wealthaai@gmail.com</p> */}
              </div>
            </div>
            <ul className="py-2 text-gray-700">
              <li
                onClick={() => handleProfile()}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaUserCircle /> Profile
              </li>
              <li
              onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
              >
                <FaSignOutAlt /> Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
