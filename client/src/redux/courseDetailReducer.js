import * as types from "../constants/unitActionTypes.js";
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

    // create course
    case types.CREATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_UNIT_SUCCESS:
      return {
        ...state,
        units: [...state.units, action.payload],
        loading: false,
        success: true,
      };
    case types.CREATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // update course
    case types.UPDATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        loading: state.units,

        units: state.units.map((unit) =>
          unit.id === action.payload.id ? action.payload : unit
        ),

        success: state.units,
      };
    case types.UPDATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // delete course
    case types.DELETE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_UNIT_SUCCESS:
      return {
        ...state,
        units: state?.units?.filter((unit) => unit?.id !== action?.payload?.id),
        loading: false,
        success: true,
      };
    case types.DELETE_UNIT_FAILED:
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
