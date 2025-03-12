import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Switch, Route } from "react-router-dom";

import { Signup, Login } from "components/Authentication";
import Blog from "components/Blog";
import BlogCreate from "components/Blog/Create";
import BlogEdit from "components/Blog/Edit";
import BlogPreview from "components/Blog/Preview";
import Blogs from "components/Blogs";
import { Navbar, PrivateRoute } from "components/commons";
import MyPosts from "components/MyPosts/MyPosts";
import { getFromLocalStorage } from "utils/storage";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Switch>
      <Route exact component={Signup} path="/signup" />
      <Route exact component={Login} path="/login" />
      <Route exact component={BlogPreview} path="/posts/preview" />
      <Navbar>
        <Route exact component={Blog} path="/posts/:slug/show" />
        <Route exact component={BlogCreate} path="/create" />
        <Route exact component={BlogEdit} path="/posts/:slug/edit" />
        <PrivateRoute
          component={MyPosts}
          condition={isLoggedIn}
          path="/my-posts"
          redirectRoute="/login"
        />
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
