// configureStore.js

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import Reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["routerReducer", "UI", "pictures"]
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const history = createHistory();
const middleware = routerMiddleware(history);
const storeConfig = composeEnhancers(applyMiddleware(middleware));

const persistedReducer = persistCombineReducers(persistConfig, Reducers);

export default () => {
  const store = createStore(persistedReducer, storeConfig);
  const persistor = persistStore(store);
  return { store, persistor, history };
};
