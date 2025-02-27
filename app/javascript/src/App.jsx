import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./components/Main";

const App = () => (
  <Router>
    <ToastContainer />
    <Main />
  </Router>
);

export default App;
