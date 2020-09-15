import React, { Component } from "react";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";

import instance from "axios-instance";
import CategoryTable from "components/CategoryTable/CategoryTable";
import SearchBar from "components/SearchBar/SearchBar";

class EditCategory extends Component {
  state = {
    categories: null,
    loading: true,
    showModal: true,
    header: ["id", "Categoria", "Accion"],
  };

  componentDidMount() {
    instance
      .get("category-list/")
      .then((response) => {
        this.setState({
          categories: response.data,
          showModal: false,
          loading: false,
        });
        // console.log(this.state.categories);
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
        <SearchBar />
        <FormBox>
          <Title>Editar Categoria</Title>
          <CategoryTable
            header={this.state.header}
            data={this.state.categories}
          />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditCategory;
