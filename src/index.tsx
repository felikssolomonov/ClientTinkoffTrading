// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProvider from "./AppContext";
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);

