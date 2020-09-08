import React, { Component } from "react";
import "./App.css";

import Login from "containers/Login/Login";
import Home from "containers/Home/Home";
import NotFound from "containers/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import { Route, Switch } from "react-router-dom";
import DeletePaper from "containers/DeletePaper/DeletePaper";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home/create-paper" component={Home} />
          <ProtectedRoute path="/home/delete-paper" component={DeletePaper} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
