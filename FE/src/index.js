import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

// import Routes from "./routes";
import reducer from "./redux/reducers";
import { BASE_URL } from "./config";
import App from "./app";

axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true;
// console.log('BASE_URL: ', axios.defaults.baseURL);

const middleware = applyMiddleware(promiseMiddleware, ReduxThunk);

ReactDOM.render(
  <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
    <App />
  </Provider>,
  document.getElementById("root")
);
