import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Switch, Route } from "react-router-dom";

import { Signup, Login } from "components/Authentication";
import Blog from "components/Blog";
import CreatePost from "components/Blog/Create";
import EditPost from "components/Blog/Edit";
import Blogs from "components/Blogs";
import { Navbar, PrivateRoute } from "components/commons";
import { getFromLocalStorage } from "utils/storage";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Switch>
      <Route exact component={Signup} path="/signup" />
      <Route exact component={Login} path="/login" />
      <Navbar>
        <Route exact component={Blog} path="/posts/:slug/show" />
        <Route exact component={CreatePost} path="/create" />
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        {/* <Route exact path="/" render={() => <Blogs />} /> */}
        <PrivateRoute
          component={Blogs}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Navbar>
    </Switch>
  );
};

export default Main;
