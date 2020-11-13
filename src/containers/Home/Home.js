import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Subtitle from "components/Subtitle/Subtitle";
import Text from "components/Text/Text";
import LoadingModal from "components/LoadingModal/LoadingModal";

import APICalls from "APICalls/APICalls";

class Home extends Component {
  state = {
    paperCount: null,
    categoryCount: null,
    ratedCount: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const data = await APICalls.getInfo();
      if (data) {
        this.setState({
          paperCount: data.papers,
          categoryCount: data.categories,
          ratedCount: data.rateds,
        });
        this.setState({
          loading: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading && <LoadingModal />}
        <Toolbar />
        <FormBox fill>
          <Title>Bienvenido Administrador</Title>
          <Subtitle>Papers Activos</Subtitle>
          <Text>{this.state.paperCount}</Text>
          <Subtitle>Categorias Activas</Subtitle>
          <Text>{this.state.categoryCount}</Text>
          <Subtitle>Articulos calificados</Subtitle>
          <Text>
            {this.state.ratedCount}/{this.state.paperCount}
          </Text>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default Home;
