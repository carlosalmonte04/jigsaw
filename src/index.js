import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ConfigureStore from "./store/ConfigureStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const { store, persistor, history } = ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App history={history} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
