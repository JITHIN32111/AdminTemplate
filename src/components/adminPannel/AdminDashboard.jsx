import React, { useState, useEffect } from "react";
import { FaArrowUp, FaDollarSign, FaUser, FaPen, FaCopy, FaWallet, FaUsers, FaLevelUpAlt, FaGift, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { PiUsersFourFill } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import SetRate from "../../modals/SetRate";
import Table3 from "./Table2";
import { FaExchangeAlt } from "react-icons/fa";

import img from '../../assets/mainLogo2.png'
import img2 from '../../assets/mainLogo.png'

import usdtImg from '../../assets/usdtIcon.png'


import Charts from "./Chart";
import authAPI from "../../apis/authApi";
const { getCounts } = authAPI()




const DashboardCard = ({ title, value, description, tag, tagColor, icon }) => {
  return (
    <div className="bg-slate-50 p-3 px-4 sm:p-9 rounded-lg shadow-md flex flex-col space-y-2  h-full w-full"
    >
      <div className="flex justify-between gap-x-2 items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-gray-400 text-2xl">
          {icon}
        </span>
        {/* <span className={`text-xs font-medium px-2 py-1 rounded ${tagColor}`}>
          {tag}
        </span> */}
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-gray-500 text-xs md:text-base">{description}</p>
    </div>
  );
};

const CurrencyConverter = ({ Ograte ,getCardCounts}) => {

  const [rate, setRate] = useState(0.00); // Conversion rate from the API
  const [dollarAmount, setDollarAmount] = useState(""); // Dollar input state
  const [convertedValue, setConvertedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);




  useEffect(()=>{
  if (Ograte) {
    setRate(Ograte)
  }
  },[Ograte])
  console.log("7777");

  console.log(rate);
  console.log("7777");


  useEffect(() => {
    // Check if rate is defined and dollarAmount is a number
    if (rate > 0 && dollarAmount) {
      console.log(dollarAmount);
      console.log("________________");


      // Check for truthy dollarAmount
      const converted = Number(dollarAmount) / rate;
      console.log(converted);
      // Ensure dollarAmount is a number
      setConvertedValue(converted); // Keep two decimal points for currency
    } else {
      setConvertedValue(""); // Reset if the conditions are not met
    }
  }, [dollarAmount, rate]);

  const handleDollarChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      console.log("Input cleared, setting convertedValue to empty.");
      setDollarAmount(""); // Set dollarAmount to an empty string
      setConvertedValue(""); // Also reset converted value if necessary
    } else {
      // Allow only valid number values
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setDollarAmount(parsedValue); // Set the state to a number
      }
    }
  };




  const handleRate = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };




  return (
    <>
      <div className="w-full lg:px-2 px-0 ">
        <h1 className="text-gray-700 text-md xs:text-xl pl-3 sm:pl-0 md:text-xl font-bold mb-5">
          BLIZ Token Conversion
        </h1>
        <div className="bg-zinc-100 p-6 mt-8 md:py-9 rounded-lg  mx-auto shadow-blue-300 shadow-md">
          <div className="flex sm:items-center gap-x-4 flex-col justify-between mb-4 gap-y-3">
            {/* USDT Input */}
            <div className="rounded-md border  flex flex-row shadow-md shadow-blue-300 gap-x-1 w-full">
              <input
                type="number"
                value={dollarAmount}
                placeholder="Enter USDT"
                onChange={handleDollarChange}
                className="placeholder-small py-2 w-full bg-transparent text-black text-sm md:text-xl focus:outline-none pl-2  "
              />
              <div className="flex items-center mr-3 sm:mr-5">
                <img
                  src={usdtImg}
                  alt=""
                  className="w-8 h-5 md:w-10 md:h-6 "
                />
                <select className="bg-transparent text-black md:text-lg text-sm focus:outline-none">
                  <option>USDT</option>
                </select>
              </div>
            </div>

            {/* Exchange icon */}
            <FaExchangeAlt className="hover:scale-95 ease-in-out text-blue-500 mx-auto text-xl xs:text-2xl sm:text-3xl cursor-pointer" />

            {/* BLIZ Token Input */}
            <div className="rounded-md border flex flex-row shadow-md shadow-blue-300 gap-x-1 w-full">
              <input
                type="number"
                value={convertedValue}
                placeholder="BLIZ Token"
                readOnly
                className="placeholder-small py-2 w-full bg-transparent text-black md:text-xl text-sm focus:outline-none pl-2"
              />
              <div className="flex items-center mr-3 sm:mr-12 md:mr-5">
                <img
                  src={img}
                  alt=""
                  className="w-8 h-5 md:w-10 md:h-6 mr-0.5 lg:mr-1"
                />
                <select className="bg-transparent text-gray-700 md:text-lg text-sm focus:outline-none">
                  <option>BLIZ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Exchange Rate Information */}
          {!dollarAmount ? (
            <p className="text-gray-800 font-semibold text-center text-base mt-4">
              1 Dollar = {1/rate} Tokens (Corresponding Rate)
            </p>
          ) : (
            <p className="text-gray-800 font-semibold text-center text-base mt-4">
              {dollarAmount} Dollar = {convertedValue} Tokens (Corresponding Rate)
            </p>
          )}

          {/* Connect Wallet Button */}
          <div className="text-center mt-6 relative z-20">
            <button
              onClick={handleRate}
              className="bg-button_color hover:scale-95 ease-in text-white sm:w-2/3 w-full py-2 rounded-xl text-lg bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 hover:bg-blue-600 shadow-md"
            >

              Set Rate

            </button>
          </div>
        </div>



        {isModalOpen && (
          <SetRate
            closeModal={closeModal}
            rate={Ograte}
            getCardCounts={getCardCounts}
          />
        )}

      </div>
    </>


  );
};

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState(0)
  const [users, setUsers] = useState(0)
  const [rate, setRate] = useState(0)

  const getCardCounts = async () => {
    try {
      const res = await getCounts()
      setRate(res?.data?.data.currentConversionRate)

      setTransactions(res?.data?.data.TotalTransaction)
      setUsers(res?.data?.data.TotalUsers)
    } catch (err) {
      console.log(err);

    }
  }


  useEffect(() => {
    getCardCounts()
  }, [])







  return (
    <div className="mt-6 mb-4 min-h-screen bg-gray-100">


      {/* //top cards */}
      <div className="px-6 grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500     text-white p-2 sm:p-3 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <PiUsersFourFill className="sm:text-4xl text-3xl mb-4" />
          <h2 className="sm:text-2xl text-base font-semibold">Total Users</h2>
          <p className="sm:text-5xl text-2xl font-bold mt-2">{transactions || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500  text-white p-2 sm:p-3 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          {/* <BsFillArrowUpRightCircleFill className="sm:text-4xl text-3xl mb-4" /> */}
          <img src={img2} alt="" className="w-14 h-14 mb-4 -mt-3 sm:-mt-0" />
          <h2 className="sm:text-2xl text-base font-semibold -mt-4">Token Rate</h2>
          <p className="sm:text-5xl text-2xl font-bold mt-2">{rate || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500  text-white p-2 sm:p-3 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <GrTransaction className="sm:text-4xl text-3xl mb-4" />
          <h2 className="sm:text-2xl text-base font-semibold">Transactions</h2>
          <p className="sm:text-5xl text-2xl font-bold mt-2">{users || 0}</p>
        </div>
      </div>

      {/* /end of top cards */}

      <div className="p-6 flex  gap-6 w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full lg:w-1/2">
            <CurrencyConverter Ograte={rate} getCardCounts={getCardCounts}/>

          </div>

          <div className="w-full lg:w-1/2">
            <Charts />

          </div>
        </div>
      </div>

      {/* <div className="flex flex-col lg:flex-row gap-x-4 ">
        <div className="w-full lg:w-2/3">
        <Charts/>
    
        </div>
        <div className="w-full lg:w-2/3">
        <Table3/>
    
        </div>
      </div> */}




    </div>
  );
};

export default AdminDashboard;
