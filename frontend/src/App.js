import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Auth, GlobalLoader, Alerts } from "./_components";
import { HomePage, LoginPage } from "./Page";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route path="/" component={Auth(HomePage)} />
      </Switch>
      <GlobalLoader />
      <Alerts />
    </Router>
  );
}

export default App;
