import React from 'react';

const Wallet = ({ closeModal, isModalOpen, selectedUser }) => {
  return (
    <div className="min-h-screen flex items-center justify-center -mt-10 bg-gray-100">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-4xl">
            <button 
              onClick={() => closeModal()} 
              className="absolute top-2 right-2 text-gray-600"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-semibold mb-4">All Referral</h2>
            <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-zinc-500 font-extralight bg-gray-300">
                  <tr className="h-14">
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Created At</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 font-medium">
                  {selectedUser && selectedUser.length > 0 ? (
                    selectedUser.map((user, index) => (
                      <tr key={user._id} className="bg-zinc-100 mt-2 border">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-700">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        No user data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
