import * as types from "../constants/unitActionTypes.js";
import {
  GET_QUESTIONS_BY_ID,
  GET_QUESTIONS_BY_ID_SUCCESS,
  GET_QUESTIONS_BY_ID_FAILED,
} from "../constants/questionsActionTypes.js";
import {
  GET_COURSE_BY_ID,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_FAILED,
} from "../constants/courseActionTypes.js";

const initialState = {
  course: null,
  units: [],
  questionSets: [],
  loading: false,
  success: false,
  failed: false,
  message: "",
};

const courseDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        questionSets: action.payload,
        loading: false,
        success: true,
      };
    case GET_QUESTIONS_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // get course by id
    case GET_COURSE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSE_BY_ID_SUCCESS:
      return {
        ...state,
        course: action.payload,
        loading: false,
        success: true,
      };
    case GET_COURSE_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // get courses
    case types.GET_UNITS:
      return {
        ...state,
        loading: true,
      };
    case types.GET_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload,
        loading: false,
        success: true,
      };

    case types.GET_UNITS_FAILED:
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
      };

    default:
      return state;
  }
};

export default courseDetailReducer;
