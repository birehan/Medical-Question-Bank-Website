import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import users from "./userReducer.js";
import courses from "./courseReducer.js";
import courseDetail from "./courseDetailReducer.js";
import questions from "./questionReducer.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "courses", "courseDetail", "questions"],
};

const rootReducer = combineReducers({
  users,
  courses,
  courseDetail,
  questions,
});
const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;
