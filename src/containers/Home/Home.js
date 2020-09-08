import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title>Bienvenido Administrador</Title>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default Home;
