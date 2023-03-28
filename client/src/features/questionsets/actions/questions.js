import * as constants from "../../../constants/questionsActionTypes.js";

export const getQuestions = () => {
  return { type: constants.GET_QUESTIONS };
};

export const getQuestionsById = (id) => {
  return { type: constants.GET_QUESTIONS_BY_ID, payload: id };
};

export const getQuestionsByCourseId = (id) => {
  return { type: constants.GET_QUESTIONS_BY_COURSE_ID, payload: id };
};

export const createQuestions = (questions) => {
  return { type: constants.CREATE_QUESTIONS, payload: questions };
};

export const updateQuestions = (questions) => {
  return { type: constants.UPDATE_QUESTIONS, payload: questions };
};

export const updateLikes = (data) => {
  return { type: constants.ADD_LIKE, payload: data };
};
export const deleteQuestions = (id) => {
  return { type: constants.DELETE_QUESTIONS, payload: id };
};

export const cleanUpQuesions = () => {
  return { type: constants.CLEAN_UP_QUESTIONS };
};
