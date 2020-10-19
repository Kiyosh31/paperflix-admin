import React, { Component } from "react";
import "./EditPaper.css";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import PaperTable from "components/PaperTable/PaperTable";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import SearchInput from "components/SearchInput/SearchInput";

import APICalls from "APICalls/APICalls";

class EditPaper extends Component {
  state = {
    papers: null,
    showModal: true,
    loading: true,
    search: null,
  };

  async componentDidMount() {
    try {
      const fetchedPapers = await APICalls.getAllPapers();
      if (fetchedPapers) {
        this.setState({
          papers: fetchedPapers,
          showModal: false,
          loading: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  searchHandler = (event) => {
    this.setState({ search: event.target.value });
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

    let filteredPapers = null;
    if (this.state.search === "" || this.state.search === null) {
      filteredPapers = this.state.papers;
    } else {
      filteredPapers = this.state.papers.filter((paper) => {
        return (
          paper.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
          paper.author.toLowerCase().includes(this.state.search.toLowerCase())
        );
      });
    }

    return (
      <div>
        {modal}
        <Toolbar />
        <FormBox>
          <Title>Editar Documento</Title>
          <SearchInput
            placeholder="Buscar Documentos |titulo| o |autor|"
            changed={this.searchHandler}
          />
          <PaperTable data={filteredPapers} />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditPaper;
