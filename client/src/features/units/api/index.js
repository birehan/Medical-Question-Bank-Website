import axios from "axios";

const url = "http://localhost:8080";
// const url = "http://192.168.241.120:8000/api/v1/";
axios.defaults.withCredentials = true;

const transport = axios.create({
  withCredentials: true,
});

export const getAllUnits = async () => {
  try {
    const { data } = await axios.get(`${url}/units`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUnits = async (courseId) => {
  try {
    const { data } = await axios.get(`${url}/units/${courseId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUnitById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/unit/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUnit = async (unit) => {
  try {
    const { data } = await transport.post(`${url}/units`, unit);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};

export const updateUnit = async (unit) => {
  try {
    const { data } = await transport.put(`${url}/unit/${unit?.id}`, unit);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};

export const deleteUnit = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/unit/${id}/`);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};
