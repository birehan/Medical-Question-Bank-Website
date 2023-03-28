import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/questionsActionTypes.js";
import * as api from "../features/questionsets/api/index.js";

function* createQuestions({ payload }) {
  try {
    const questions = yield call(api.createQuestions, payload);
    yield put({ type: types.CREATE_QUESTIONS_SUCCESS, payload: questions });
  } catch (error) {
    yield put({
      type: types.CREATE_QUESTIONS_FAILED,
      payload: error,
    });
  }
}

function* getAllQuestions({ payload }) {
  try {
    const questions = yield call(api.getAllQuestions, payload);
    yield put({ type: types.GET_QUESTIONS_SUCCESS, payload: questions });
  } catch (error) {
    yield put({
      type: types.GET_QUESTIONS_FAILED,
      payload: error,
    });
  }
}

function* getQuestionById({ payload }) {
  try {
    const question = yield call(api.getQuestionsById, payload);
    yield put({ type: types.GET_QUESTIONS_BY_ID_SUCCESS, payload: question });
  } catch (error) {
    yield put({
      type: types.GET_QUESTIONS_BY_ID_FAILED,
      payload: error,
    });
  }
}
function* getQuestionsByCourseId({ payload }) {
  try {
    const question = yield call(api.getQuestionsByCourseId, payload);
    yield put({
      type: types.GET_QUESTIONS_BY_COURSE_ID_SUCCESS,
      payload: question,
    });
  } catch (error) {
    yield put({
      type: types.GET_QUESTIONS_BY_COURSE_ID_FAILED,
      payload: error,
    });
  }
}

function* updateQuestions({ payload }) {
  try {
    const question = yield call(api.updateQuestions, payload);
    yield put({ type: types.UPDATE_QUESTIONS_SUCCESS, payload: question });
  } catch (error) {
    yield put({ type: types.UPDATE_QUESTIONS_FAILED, payload: error });
  }
}

function* updateLike({ payload }) {
  try {
    const question = yield call(api.updateLike, payload);
    yield put({ type: types.ADD_LIKE_SUCCESS, payload: question });
  } catch (error) {
    yield put({ type: types.ADD_LIKE_FAILED, payload: error });
  }
}

function* deleteQuestions({ payload }) {
  try {
    const question = yield call(api.deleteQuestions, payload);
    yield put({ type: types.DELETE_QUESTIONS_SUCCESS, payload: question });
  } catch (error) {
    yield put({ type: types.DELETE_QUESTIONS_FAILED, payload: error });
  }
}

function* questionSaga() {
  yield takeEvery(types.GET_QUESTIONS, getAllQuestions);
  yield takeEvery(types.GET_QUESTIONS_BY_ID, getQuestionById);
  yield takeEvery(types.GET_QUESTIONS_BY_COURSE_ID, getQuestionsByCourseId);

  yield takeEvery(types.CREATE_QUESTIONS, createQuestions);
  yield takeEvery(types.UPDATE_QUESTIONS, updateQuestions);
  yield takeEvery(types.ADD_LIKE, updateLike);

  yield takeEvery(types.DELETE_QUESTIONS, deleteQuestions);
}

export default questionSaga;
