import axios from "axios";

const url = "http://localhost:8080";
// const url = "http://192.168.241.120:8000/api/v1/";
axios.defaults.withCredentials = true;

const transport = axios.create({
  withCredentials: true,
});

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const getAllQuestions = async () => {
  try {
    const { data } = await axios.get(url + "/questions");
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuestionsByCourseId = async (id) => {
  try {
    const { data } = await axios.get(`${url}/courses/${id}/questions`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionsById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/questions/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createQuestions = async (formdata) => {
  try {
    const { data } = await transport.post(`${url}/questions`, formdata);
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

export const updateQuestions = async (questions) => {
  try {
    const { data } = await transport.put(
      `${url}/questions/${questions.id}`,
      questions
    );
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

export const updateLike = async (file) => {
  try {
    const { data } = await transport.put(`${url}/updateLike`, file);
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

export const deleteQuestions = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/questions/${id}/`);
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};
