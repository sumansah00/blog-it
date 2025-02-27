import React from "react";

import { Switch, Route } from "react-router-dom";

import Blogs from "components/Blogs";
import Navbar from "components/common/Navbar";

const Main = () => (
  <Navbar>
    <Switch>
      <Route exact path="/" render={() => <Blogs />} />
      <Route exact path="/about" render={() => <div>About</div>} />
    </Switch>
  </Navbar>
);

export default Main;
