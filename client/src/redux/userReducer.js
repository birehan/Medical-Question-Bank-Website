import * as types from "../constants/actionTypes.js";

const initialState = {
  currentUser: null,
  loading: false,
  success: false,
  failed: false,
  message: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all conditions
    case types.CLEAN_UP:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
      };

    case types.LOG_OUT:
      return {
        ...state,
        currentUser: null,
      };

    case types.FETCH_ALL_USER:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        success: true,
      };
    case types.FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    // Create user conditions
    case types.CREATE_USER:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case types.GET_LOGGED_USER:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: "",
        currentUser: action.payload,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        failed: true,
        message: action.payload.toString(),
      };
    case types.GET_USER:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        success: true,
        loading: false,
        failed: false,
        message: "",
      };
    case types.CREATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    // Update employee conditions
    case types.UPDATE_USER:
      return {
        ...state,
        loading: true,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case types.UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        // message: action.payload,
      };
    // Delete employee
    case types.DELETE_USER:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        success: true,
      };
    case types.DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        // message: action.payload,
      };

    case types.FORGET_PASSWORD:
      return {
        ...state,
      };
    case types.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        failed: false,
        message: "",
      };

    // Update employee conditions
    case types.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        failed: true,
        message: action.payload.toString(),
      };

    case types.RESET_PASSWORD:
      return {
        ...state,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        failed: false,
        message: action.payload,
      };

    // Update employee conditions
    case types.RESET_PASSWORD_FAILED:
      return {
        ...state,
        failed: true,
        success: false,
        message: action.payload.toString(),
      };

    case types.SEND_MESSAGE:
      return {
        ...state,
      };
    case types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        failed: false,
        message: action.payload,
      };

    // Update employee conditions
    case types.SEND_MESSAGE_FAILED:
      return {
        ...state,
        failed: true,
        success: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
