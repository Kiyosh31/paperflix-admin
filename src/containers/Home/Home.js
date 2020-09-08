import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Subtitle from "components/Subtitle/Subtitle";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title>Bienvenido Administrador</Title>
          <Subtitle>Papers Activos</Subtitle>
          <Subtitle>Categorias Activas</Subtitle>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default Home;
