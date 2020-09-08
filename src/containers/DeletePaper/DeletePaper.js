import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Title from "components/Title/Title";
import FormBox from "components/FormBox/FormBox";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title>Eliminar Documento</Title>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default Home;
