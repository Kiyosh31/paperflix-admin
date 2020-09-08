import React, { Component } from "react";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";

class EditCategory extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title>Editar Categoria</Title>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditCategory;
