import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/actionTypes.js";
import * as api from "../features/authentication/api/index.js";

function* createUser({ payload }) {
  try {
    const user = yield call(api.createUser, payload);
    yield put({ type: types.CREATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.CREATE_USER_FAILED,
      payload: error,
    });
  }
}

function* sendMessage({ payload }) {
  try {
    const message = yield call(api.sendMessage, payload);
    yield put({ type: types.SEND_MESSAGE_SUCCESS, payload: message });
  } catch (error) {
    yield put({
      type: types.SEND_MESSAGE_FAILED,
      payload: error,
    });
  }
}

function* forgetPassword({ payload }) {
  try {
    const unit = yield call(api.forgetPassword, payload);
    yield put({ type: types.FORGET_PASSWORD_SUCCESS, payload: unit });
  } catch (error) {
    yield put({
      type: types.FORGET_PASSWORD_FAILED,
      payload: error,
    });
  }
}

function* resetPassword({ payload }) {
  try {
    const unit = yield call(api.resetPassword, payload);
    yield put({ type: types.RESET_PASSWORD_SUCCESS, payload: unit });
  } catch (error) {
    yield put({
      type: types.RESET_PASSWORD_FAILED,
      payload: error,
    });
  }
}
function* loginUser({ payload }) {
  try {
    const user = yield call(api.login, payload);
    yield put({ type: types.CREATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.CREATE_USER_FAILED,
      payload: error,
    });
  }
}

function* getLoggedUser() {
  try {
    const user = yield call(api.getLoggedUser);
    yield put({ type: types.LOGIN_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.LOGIN_FAILED,
      payload: error,
    });
  }
}

function* getCurrentUser({ payload }) {
  try {
    const user = yield call(api.getCurrentUser, payload);
    yield put({ type: types.CREATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.CREATE_USER_FAILED,
      payload: error,
    });
  }
}

function* updateUser({ payload }) {
  try {
    const user = yield call(api.updateUser, payload);
    yield put({ type: types.UPDATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILED, message: error });
  }
}

function* deleteUser({ payload }) {
  try {
    const id = yield call(api.deleteUser, payload);
    yield put({ type: types.DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    yield put({ type: types.DELETE_USER_FAILED, message: error.message });
  }
}

function* userSaga() {
  yield takeEvery(types.LOGIN_USER, loginUser);
  yield takeEvery(types.FORGET_PASSWORD, forgetPassword);
  yield takeEvery(types.RESET_PASSWORD, resetPassword);

  yield takeEvery(types.GET_LOGGED_USER, getLoggedUser);

  yield takeEvery(types.CREATE_USER, createUser);
  yield takeEvery(types.GET_USER, getCurrentUser);

  yield takeEvery(types.UPDATE_USER, updateUser);
  yield takeEvery(types.DELETE_USER, deleteUser);

  yield takeEvery(types.SEND_MESSAGE, sendMessage);
}

export default userSaga;
