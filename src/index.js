import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import JavascriptTimeAgo from "javascript-time-ago";

// The desired locales.
import en from "javascript-time-ago/locale/en";

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

// Create a store, when a store call is passing reducer and pass middleware.
const store = createStore(reducer, middleware);

// Warp main app component inside of the provider component.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
