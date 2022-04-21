import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxPromisee from "redux-promise";
import reduxThunk from "redux-thunk";
import Reducer from "./_reducers/index";

import "antd/dist/antd.css";
import App from "./App";

const storeMiddleware = applyMiddleware(reduxPromisee, reduxThunk)(createStore);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider
    store={storeMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);
