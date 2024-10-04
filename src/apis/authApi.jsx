import axiosConfig from '../config/axiosConfig';

const authAPI = () => {
  const doLogin = async (data) => {
  
    console.log("Login data:", data);
    const res = await axiosConfig.post("/admin/adminLogin", data);
    console.log(res);
    console.log("|||||||||||");
    
    
    return res;
  };  
  const getAllUsers = async () => {
    const res = await axiosConfig.get("/admin/users");
    console.log(res);
    return res;
  };
  const blockUser=async (userId) => {
    const res = await axiosConfig.get(`/admin/block-user/${userId}`);
    console.log(res);
    return res;
  };
  const getUserDetails=async (userId) => {
    const res = await axiosConfig.get(`/admin/incomeHistory-refferals/${userId}`);
    console.log(res);
    return res;
  };
  const getTransactionGraph=async () => {
    const res = await axiosConfig.get(`/admin/getweb3Transaction`);
    console.log(res);
    return res;
  };
  // const deleteUser=async (data) => {
  //   const res = await axiosConfig.get(`/admin/delete`,data);
  //   console.log(res);
  //   return res;
  // };

  const setRate=async (data) => {
    const res = await axiosConfig.post(`/admin/conversion`,data);
    console.log(res);
    return res;
  }; 
   const getAllTransactions=async () => {
    const res = await axiosConfig.get(`/admin/allWeb3-transaction`);
    console.log(res);
    return res;
  };

  const editAdminProfile=async (data) => {
    console.log(":_______________________");
    
    const res = await axiosConfig.patch(`/admin/edit-profile`,data);
    console.log(res);
    return res;
  };
  const getCounts=async () => {
    
    const res = await axiosConfig.get(`/admin/count`);


    return res;
  };
  const getPrevPhase=async () => {
    
    const res = await axiosConfig.get(`/admin/history-conversion-bacis`);


    return res;
  };



  
  return {getPrevPhase,getCounts, editAdminProfile,doLogin,getAllUsers,blockUser,getUserDetails,getTransactionGraph,setRate,getAllTransactions};
};

export default authAPI;
