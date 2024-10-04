import React, { useState, useEffect } from "react";
import authAPI from "../../apis/authApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddMember from "../../modals/AddMember";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import Wallet from "./Wallet";
import { FcInvite } from "react-icons/fc";
import TransactionModal from "./TransactionModal";
const { getAllUsers, blockUser, getUserDetails } = authAPI();

function Table2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

   // State to store user details
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsersData(response?.data?.data?.users);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (userId, currentStatus) => {
    try {
      const res = await blockUser(userId);

      // Update the state for the specific user by toggling the `isBlocked` status
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error in blocking/unblocking user", error);
    }
  };

  const handleDetails = async (userId) => {
    try {
      const res = await getUserDetails(userId);
      console.log("{{{{{{{{{{");
      console.log(res?.data?.data?.refferals);

      setSelectedUser(res?.data?.data?.refferals); // Store the user's details
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Reset the selected user details when closing the modal
  };

  const filteredUsers = (usersData || []).filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );






  const handleTransactions = async(userId) => {
    try {
      const res = await getUserDetails(userId);
      console.log("{{{{{{{{{{");
      console.log(res?.data?.data);

      setTransactions(res?.data?.data?.incomeHistory); // Store the user's details
      setIsModalOpen2(true); // Open the modal
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  }


  const closeModal2 = () => {
    setIsModalOpen2(false);
    setTransactions(null); // Reset the selected user details when closing the modal
  };



  return (
    <div className="md:-mt-10 -mt-3 lg:px-24 md:px-10 px-4 pb-5">
      <h1 className="text-blue-700 text-md xs:text-xl pl-3 sm:pl-0 md:text-2xl lg:text-2xl font-bold mb-5 mt-8 sm:mt-12 md:mt-14 lg:mt-24">
        Members List
      </h1>

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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs sm:text-sm text-white font-extralight bg-gradient-to-r from-blue-500 to-indigo-500">
              <tr className="h-14">
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Wallet Tokens</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
                <th scope="col" className="px-2 py-3">Refferals</th>
                <th scope="col" className="px-2 py-3">Transactions</th>

              </tr>
            </thead>
            <tbody className="text-black font-medium">
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="bg-zinc-100 mt-2 border">
                  <th scope="row" className="px-6 py-4 font-medium text-blue-900">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.WalletAmount}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full ${user.isBlocked ? "bg-red-700" : "bg-green-700"
                        } text-white`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                    >
                      {user.isBlocked ? (
                        <FaUnlock className="mr-2 text-black hover:scale-110 transition-transform duration-200 hover:text-blue-800" />
                      ) : (
                        <FaLock className="mr-2 text-black hover:scale-110 transition-transform duration-200 hover:text-blue-800" />
                      )}
                    </button>
                  </td>
                  <td className="pl-4 py-4">
                    <span
                      onClick={() => handleDetails(user._id)}
                      className="cursor-pointer text-black"
                    >
                      <FcInvite
                        className="text-black hover:scale-110 transition-transform duration-200 hover:text-blue-800"
                        size={18}
                      />
                    </span>
                  </td>

                  <td className="pl-6 py-4">
                    <span
                      onClick={() => handleTransactions(user._id)}
                      className="cursor-pointer text-black"
                    >
                      <AiFillDatabase
                        className="text-black hover:scale-110 transition-transform duration-200 hover:text-blue-800"
                        size={18}
                      />
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <>
          <Wallet closeModal={closeModal} isModalOpen={isModalOpen} selectedUser={selectedUser} />
        </>
      )}
       {isModalOpen2 && (
        <>
          <TransactionModal closeModal2={closeModal2} isModalOpen2={isModalOpen2} transactions={transactions} />
        </>
      )}
    </div>
  );
}

export default Table2;
