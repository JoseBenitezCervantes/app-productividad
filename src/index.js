import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./layouts/Admin.js";

ReactDOM.render(
  <Router >
    <Switch>
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
