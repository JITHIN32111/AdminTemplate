import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import authAPI from "../../apis/authApi";
const { getAllTransactions, getPrevPhase } = authAPI();

function Table() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [conversionRates, setConversionRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState("all");

  // Fetch all transactions
  const getDetails = async () => {
    try {
      const response = await getAllTransactions();
      if (response?.data?.data?.web3Transations) {
        setTransactions(response.data.data.web3Transations);
        setFilteredTransactions(response.data.data.web3Transations);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch previous rates (phases)
  const getPrevRates = async () => {
    try {
      const res = await getPrevPhase();
      if (res?.data?.data?.conversionResults) {
        setConversionRates(res.data.data.conversionResults);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetails();
    getPrevRates();
  }, []);

  // Filter transactions by selected conversion rate
  const handleRateChange = (e) => {
    const selected = e.target.value;
    setSelectedRate(selected);
    if (selected === "all") {
      setFilteredTransactions(transactions);
    } else {
      const selectedPhase = conversionRates.find(rate => rate.phase === selected);
      setFilteredTransactions(selectedPhase ? selectedPhase.transactions : []);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US', timeOptions)}`;
  };

  const filteredBySearch = filteredTransactions.filter((transaction) =>
    transaction.incomeGeneratorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:-mt-10 -mt-3 lg:px-24 md:px-10 px-4 pb-5">
      <div className="flex flex-row justify-between items-center mb-5 mt-8 sm:mt-12 md:mt-14 lg:mt-24">
        <h1 className="text-blue-700 text-md xs:text-xl pl-3 sm:pl-0 md:text-2xl lg:text-2xl font-bold">
          Transaction Table
        </h1>
        {/* Dropdown for Conversion Rates */}
        <select 
          className="border border-blue-400 rounded-md p-2 text-gray-700 focus:outline-blue-500 text-sm sm:text-[13px]"
          value={selectedRate}
          onChange={handleRateChange}
        >
          <option className="text-sm" value="all">All Rates</option>
          {conversionRates.map((rate, index) => (
            <option key={index} value={rate.phase}>
              {`Phase ${rate.phase} - Rate ${rate.conversionRate}`}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex flex-row justify-between">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-300 text-gray-800 p-2 rounded-lg w-1/3 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs sm:text-sm text-white font-extralight bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500">
            <tr className="h-14">
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Conversion Rate</th>
              <th scope="col" className="px-6 py-3">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-black font-medium">
            {filteredBySearch.map((transaction, index) => (
              <tr key={transaction._id} className="bg-zinc-100 mt-2 border">
                <th scope="row" className="px-6 py-4 font-medium text-blue-900">
                  {index + 1}
                </th>
                <td className="lg:px-6 lg:py-4 text-[12px] lg:text-sm">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="px-6 py-4">{transaction.incomeGeneratorName}</td>
                <td className="px-6 py-4">{transaction.currentConversionRate}</td>
                <td className="px-6 py-4">{transaction.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-white bg-custom-blue hover:bg-table-color py-2 px-4 rounded-lg">
          <FaChevronLeft />
        </button>
        <span className="text-white">Page 1 of 2</span>
        <button className="text-white bg-custom-blue hover:bg-table-color py-2 px-4 rounded-lg">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Table;
