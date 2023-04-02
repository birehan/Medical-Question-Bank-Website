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

export const getCourses = async () => {
  try {
    const { data } = await axios.get(url + "/courses");
    return data;
  } catch (error) {
    throw error?.message;
  }
};

export const getCourseById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/course/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (formdata) => {
  try {
    const { data } = await transport.post(`${url}/courses`, formdata, config);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};

export const updateCourse = async (course) => {
  try {
    const { data } = await transport.put(
      `${url}/course/${course.get("id")}`,
      course
    );
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};

export const deleteCourse = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/course/${id}/`);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw error?.message;
    }
    throw error?.response?.data?.message;
  }
};

export const subscribeToCourseUpdates = () => {
  const eventSource = new EventSource(`${url}/courses/updates`);

  return eventSource;
};
