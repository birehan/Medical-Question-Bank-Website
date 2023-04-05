import axios from "axios";

const url = "http://localhost:8080/";
// const url = "http://192.168.241.120:8000/api/v1/";

axios.defaults.withCredentials = true;

const transport = axios.create({
  withCredentials: true,
});

export const getUsers = async () => {
  try {
    const { data } = await axios.get(url + "users/");
    return data;
  } catch (error) {
    return error;
  }
};

export const forgetPassword = async (email) => {
  try {
    await transport.post(url + "forgetpassword/", email);

    return "success";
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const resetPassword = async (reset) => {
  try {
    await axios.post(url + "reset-password/" + reset.token, {
      password: reset.password,
    });

    return "success";
  } catch (error) {
    throw error?.response?.data?.message;
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
      throw new Error("Email address already in use!");
    } else {
      throw new Error("Something went wrong, Please try again.");
    }
  }
};
export const sendMessage = async (message) => {
  try {
    await axios.post(url + "sendmessage", message);
    return "Message sent successfully";
  } catch (error) {
    throw error?.response?.data?.message || "Message not sent!";
  }
};

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${url}login`, user);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error?.response?.data?.message);
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
