import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Blogs from "components/Blogs";

import Navbar from "./components/common/Navbar";

const App = () => (
  <>
    <Navbar />
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Blogs />} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  </>
);

export default App;
