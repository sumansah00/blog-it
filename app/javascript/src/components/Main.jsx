import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Switch, Route, Redirect } from "react-router-dom";

import { Signup, Login } from "components/Authentication";
import Blog from "components/Blog";
import BlogCreate from "components/Blog/Create";
import BlogEdit from "components/Blog/Edit";
import BlogPreview from "components/Blog/Preview";
import Blogs from "components/Blogs";
import { Navbar } from "components/commons";
import MyPosts from "components/MyPosts";
import { getFromLocalStorage } from "utils/storage";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Switch>
      <Route exact component={Signup} path="/signup" />
      <Route exact component={Login} path="/login" />
      <Route exact component={BlogPreview} path="/posts/preview" />
      {isLoggedIn ? (
        <Route path="/">
          <Navbar>
            <Switch>
              <Route exact component={Blog} path="/posts/:slug/show" />
              <Route exact component={BlogCreate} path="/create" />
              <Route exact component={BlogEdit} path="/posts/:slug/edit" />
              <Route exact component={MyPosts} path="/my-posts" />
              <Route exact component={Blogs} path="/" />
            </Switch>
          </Navbar>
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default Main;
