import React from "react";

import { Switch, Route } from "react-router-dom";

import Blog from "components/Blog";
import CreatePost from "components/Blog/Create";
import Blogs from "components/Blogs";
import { Navbar } from "components/commons";

const Main = () => (
  <Navbar>
    <Switch>
      <Route exact component={Blog} path="/blogs/:slug/show" />
      <Route exact component={CreatePost} path="/create" />
      <Route exact path="/" render={() => <Blogs />} />
      <Route exact path="/about" render={() => <div>About</div>} />
    </Switch>
  </Navbar>
);

export default Main;
