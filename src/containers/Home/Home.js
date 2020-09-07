import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import CreatePaper from "containers/CreatePaper/CreatePaper";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />

        <CreatePaper />

        <Footer />
      </div>
    );
  }
}

export default Home;
