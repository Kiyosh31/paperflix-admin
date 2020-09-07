import React, { Component } from "react";
import "./App.css";

import Login from "containers/Login/Login";
import Home from "containers/Home/Home";
import NotFound from "containers/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
