import * as types from "../constants/questionsActionTypes.js";

const initialState = {
  questions: [],
  loading: false,
  success: false,
  failed: false,
  message: "",
  question: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // get courses
    case types.GET_QUESTIONS_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case types.GET_QUESTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        question: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_QUESTIONS_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // get course by id
    case types.GET_QUESTIONS_BY_COURSE_ID:
      return {
        ...state,
        loading: true,
      };
    case types.GET_QUESTIONS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_QUESTIONS_BY_COURSE_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // create course
    case types.CREATE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        loading: false,
        success: true,
      };
    case types.CREATE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // update course
    case types.UPDATE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload : question
        ),
        loading: false,
        success: true,
      };
    case types.UPDATE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    // delete course
    case types.DELETE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state?.questions?.filter(
          (question) => question?.id !== action?.payload?.id
        ),
        loading: false,
        success: true,
      };
    case types.DELETE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case types.CLEAN_UP_QUESTIONS:
      return {
        ...state,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default questionReducer;
