import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/unitActionTypes.js";
import * as api from "../features/units/api/index.js";

function* createUnit({ payload }) {
  try {
    const unit = yield call(api.createUnit, payload);
    yield put({ type: types.CREATE_UNIT_SUCCESS, payload: unit });
  } catch (error) {
    yield put({
      type: types.CREATE_UNIT_FAILED,
      payload: error,
    });
  }
}

function* getUnits({ payload }) {
  try {
    const units = yield call(api.getUnits, payload);
    yield put({ type: types.GET_UNITS_SUCCESS, payload: units });
  } catch (error) {
    yield put({
      type: types.GET_UNITS_FAILED,
      payload: error,
    });
  }
}

function* getAllUnits() {
  try {
    const units = yield call(api.getAllUnits);
    yield put({ type: types.GET_ALL_UNITS_SUCCESS, payload: units });
  } catch (error) {
    yield put({
      type: types.GET_ALL_UNITS_FAILED,
      payload: error,
    });
  }
}

function* getUntiById({ payload }) {
  try {
    const unit = yield call(api.getUnitById, payload);
    yield put({ type: types.GET_UNIT_BY_ID_SUCCESS, payload: unit });
  } catch (error) {
    yield put({
      type: types.GET_UNITS_FAILED,
      payload: error,
    });
  }
}

function* updateUnit({ payload }) {
  try {
    const unit = yield call(api.updateUnit, payload);
    yield put({ type: types.UPDATE_UNIT_SUCCESS, payload: unit });
  } catch (error) {
    yield put({ type: types.UPDATE_UNIT_FAILED, payload: error });
  }
}

function* deleteUnit({ payload }) {
  try {
    const unit = yield call(api.deleteUnit, payload);
    yield put({ type: types.DELETE_UNIT_SUCCESS, payload: unit });
  } catch (error) {
    yield put({ type: types.DELETE_UNIT_FAILED, payload: error });
  }
}

function* unitSaga() {
  yield takeEvery(types.GET_ALL_UNITS, getAllUnits);
  yield takeEvery(types.GET_UNITS, getUnits);
  yield takeEvery(types.GET_UNIT_BY_ID, getUntiById);
  yield takeEvery(types.CREATE_UNIT, createUnit);
  yield takeEvery(types.UPDATE_UNIT, updateUnit);
  yield takeEvery(types.DELETE_UNIT, deleteUnit);
}

export default unitSaga;
