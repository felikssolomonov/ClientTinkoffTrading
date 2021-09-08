// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import AppProvider from "./Hooks/AppContext";
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);

