import React, { Component } from "react";
import FormBox from "components/FormBox/FormBox";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Title from "components/Title/Title";

class EditPaper extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title>Editar Documento</Title>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditPaper;
