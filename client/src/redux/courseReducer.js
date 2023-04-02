import * as types from "../constants/courseActionTypes.js";
import {
  GET_ALL_UNITS,
  GET_ALL_UNITS_SUCCESS,
  GET_ALL_UNITS_FAILED,
  CREATE_UNIT,
  CREATE_UNIT_SUCCESS,
  CREATE_UNIT_FAILED,
  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAILED,
  DELETE_UNIT,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILED,
} from "../constants/unitActionTypes.js";

const initialState = {
  courses: null,
  units: [],
  loading: false,
  success: false,
  failed: false,
  message: "",
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_UNITS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload,
        loading: false,
        success: true,
      };
    case GET_ALL_UNITS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // create course
    case CREATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case CREATE_UNIT_SUCCESS:
      return {
        ...state,
        units: [action.payload, ...state.units],
        loading: false,
        success: true,
      };
    case CREATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // update course
    case UPDATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        loading: state.units,

        units: [
          action.payload,
          ...state.units.filter((unit) => unit.id !== action.payload.id),
        ],

        success: state.units,
      };
    case UPDATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // delete course
    case DELETE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        units: state?.units?.filter((unit) => unit?.id !== action?.payload?.id),
        loading: false,
        success: true,
      };
    case DELETE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // get courses
    case types.GET_COURSES:
      return {
        ...state,
        loading: true,
      };
    case types.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
        courses: null,
      };

    // get course by id
    case types.GET_COURSE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case types.GET_COURSE_BY_ID_SUCCESS:
      return {
        ...state,
        course: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_COURSE_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // create course
    case types.CREATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
        loading: false,
        success: true,
      };
    case types.CREATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // update course
    case types.UPDATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [
          action.payload,
          ...state.courses.filter((course) => course.id !== action.payload.id),
        ],

        loading: false,
        success: true,
      };
    case types.UPDATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // delete course
    case types.DELETE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state?.courses?.filter(
          (course) => course?.id !== action?.payload?.id
        ),
        loading: false,
        success: true,
      };
    case types.DELETE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case types.CLEAN_UP:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
      };

    default:
      return state;
  }
};

export default courseReducer;
