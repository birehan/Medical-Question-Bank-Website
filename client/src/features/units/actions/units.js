import * as constants from "../../../constants/unitActionTypes.js";

export const getAllUnits = () => {
  return { type: constants.GET_ALL_UNITS };
};

export const getUnits = (courseId) => {
  return { type: constants.GET_UNITS, payload: courseId };
};

export const getUnitById = (id) => {
  return { type: constants.GET_UNIT_BY_ID, payload: id };
};

export const createUnit = (unit) => {
  return { type: constants.CREATE_UNIT, payload: unit };
};

export const updateUnit = (unit) => {
  return { type: constants.UPDATE_UNIT, payload: unit };
};
export const deleteUnit = (id) => {
  return { type: constants.DELETE_UNIT, payload: id };
};

export const cleanUp = () => {
  return { type: constants.CLEAN_UP };
};
