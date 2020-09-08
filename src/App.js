import React, { Component } from "react";
import "./App.css";

import Login from "containers/Login/Login";
import Home from "containers/Home/Home";
import NotFound from "containers/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import { Route, Switch } from "react-router-dom";
import CreatePaper from "containers/CreatePaper/CreatePaper";
import DeletePaper from "containers/DeletePaper/DeletePaper";
import CreateCategory from "containers/CreateCategory/CreateCategory";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/create-paper" component={CreatePaper} />
          <ProtectedRoute path="/delete-paper" component={DeletePaper} />
          <ProtectedRoute path="/create-category" component={CreateCategory} />
          <ProtectedRoute path="/edit-category" component={CreateCategory} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
