import axios from "axios";

// const API_URL = "http://localhost:5000/api/user/";
const API_URL = "https://scouts-tunisienne.herokuapp.com/api/user/";


// const API_URL_check = "http://localhost:5000/api/check/checkIn/";
const API_URL_check = "https://scouts-tunisienne.herokuapp.com/api/check/checkIn/";


// Create new user
const checkIn = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    idUser: userData.idUser,
    idSession: userData.idSession,
  };

  const response = await axios.patch(API_URL + "check", body, config);

  return response.data;
};

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "users", config);
  return response.data;
};

// update user role to organizer
const changeRole = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    role: data.role,
  };
  const id = data.userId;
  const response = await axios.patch(API_URL + "/role/" + id, body, config);

  return response.data;
};

// Delete customer
const deleteCustomer = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "delete/" + data, config);

  return response.data;
};

const UserService = {
  checkIn,
  getUsers,
  changeRole,
  deleteCustomer,
};

export default UserService;