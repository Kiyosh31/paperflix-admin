import React, { Component } from "react";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import instance from "axios-instance";
import PaperTable from "components/PaperTable/PaperTable";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import SearchBar from "components/SearchBar/SearchBar";

class EditPaper extends Component {
  state = {
    papers: null,
    showModal: true,
    loading: true,
    header: [
      "id",
      "Titulo",
      "Descripcion",
      "Año Publicacion",
      "Autor",
      "Idioma",
      "Archivo",
      "Acciones",
    ],
  };

  componentDidMount() {
    instance
      .get("paper-list/")
      .then((response) => {
        this.setState({
          papers: response.data,
          showModal: false,
          loading: false,
        });
        // console.log(this.state.papers);
      })
      .catch((err) => {
        this.setState({ showModal: false, loading: false });
        console.log(err);
      });
  }

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosedByBackdrop={this.modalHandler}
          transparent
        >
          {spinner}
        </Modal>
      );
    } else {
      modal = null;
    }

    return (
      <div>
        {modal}
        <Toolbar />
        <FormBox>
          <Title>Editar Documento</Title>
          <SearchBar />
          <PaperTable header={this.state.header} data={this.state.papers} />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditPaper;
