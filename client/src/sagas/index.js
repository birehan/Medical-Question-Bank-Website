import { all } from "redux-saga/effects";

import userSaga from "./userSaga.js";
import courseSaga from "./courseSaga.js";
import unitSaga from "./unitSaga.js";
import questionSaga from "./questionsSaga.js";

export default function* rootSaga() {
  yield all([userSaga(), courseSaga(), unitSaga(), questionSaga()]);
}
