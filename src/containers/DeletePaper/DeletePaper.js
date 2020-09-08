import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Title from "components/Title/Title";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />

        <Title>Hola</Title>

        <Footer />
      </div>
    );
  }
}

export default Home;
