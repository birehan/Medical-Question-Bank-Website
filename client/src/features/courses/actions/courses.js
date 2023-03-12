import * as constants from "../../../constants/courseActionTypes.js";

export const getCourses = () => {
  return { type: constants.GET_COURSES };
};

export const getCourseById = (id) => {
  return { type: constants.GET_COURSE_BY_ID, payload: id };
};

export const createCourse = (course) => {
  return { type: constants.CREATE_COURSE, payload: course };
};

export const updateCourse = (course) => {
  return { type: constants.UPDATE_COURSE, payload: course };
};
export const deleteCourse = (id) => {
  return { type: constants.DELETE_COURSE, payload: id };
};

export const cleanUp = () => {
  return { type: constants.CLEAN_UP };
};
