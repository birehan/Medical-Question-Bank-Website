import { createStore, applyMiddleware } from "redux";
import reducers from "./rootReducer.js";
import rootSaga from "../sagas/index.js";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();
const middlewares = [logger, sagaMiddleWare];

export const store = createStore(reducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleWare.run(rootSaga);
