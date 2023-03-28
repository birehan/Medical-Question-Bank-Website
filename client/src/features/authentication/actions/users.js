import {
  FETCH_ALL_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CLEAN_UP,
  LOGIN_USER,
  GET_USER,
  LOG_OUT,
  GET_LOGGED_USER,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  SEND_MESSAGE,
} from "../../../constants/actionTypes.js";

export const getUsers = () => {
  return { type: FETCH_ALL_USER };
};

export const cleanUp = () => {
  return { type: CLEAN_UP };
};

export const createUser = (user) => {
  return { type: CREATE_USER, payload: user };
};

export const loginUser = (user) => {
  return { type: LOGIN_USER, payload: user };
};
export const getLoggedUser = () => {
  return { type: GET_LOGGED_USER };
};
export const logOutUser = () => {
  return { type: LOG_OUT };
};

export const getCurrentUser = (id) => {
  return { type: GET_USER, payload: id };
};

export const updateUser = (user, id) => {
  return { type: UPDATE_USER, payload: { user: user, id: id } };
};

export const deleteUser = (id) => {
  return { type: DELETE_USER, payload: id };
};

export const forgetPassword = (data) => {
  return { type: FORGET_PASSWORD, payload: data };
};

export const resetPassword = (data) => {
  return { type: RESET_PASSWORD, payload: data };
};

export const sendMessage = (data) => {
  return { type: SEND_MESSAGE, payload: data };
};
