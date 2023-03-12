import axios from "axios";

const url = "http://localhost:8080/";
// const url = "http://192.168.241.120:8000/api/v1/";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(url + "users/");
    return data;
  } catch (error) {
    return error;
  }
};

export const getLoggedUser = async () => {
  try {
    const response = await axios.get(url + "login/success", {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(url + "users", user);
    return data;
  } catch (error) {
    const message = error?.response?.data?.message;
    if (message === "email must be unique") {
      throw "Email address already in use!";
    } else {
      throw "Something went wrong, Please try again.";
    }
  }
};

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${url}login`, user);
    return data;
  } catch (error) {
    if (error.response) {
      throw error?.response?.data?.message;
    }
  }
};

export const getCurrentUser = async (user_id) => {
  try {
    const response = await axios.get(`${url}user/${user_id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    localStorage.setItem("loggedUser", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (user) => {
  try {
    await fetch(`${url}user/${user.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: user.user,
    });

    const response = await axios.get(`${url}user/${user?.id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    localStorage.setItem("loggedUser", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  await axios.delete(`${url}/user/${id}/`);
  return id;
};
