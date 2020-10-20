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
    filteredPapers: null,
    canSearch: null,
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

  searchBarHandler = (event) => {
    const searchText = event.target.value;

    if (this.state.canSearch !== null || this.state.canSearch !== undefined) {
      clearTimeout(this.state.canSearch);
    }

    if (!searchText) {
      this.setState({ filteredPapers: null });
    }

    const myRef = setTimeout(async () => {
      const payload = {
        search: searchText,
      };

      try {
        const fetchedSearch = await APICalls.searchPapers(payload);
        if (fetchedSearch) {
          this.setState({ filteredPapers: fetchedSearch });
        }
      } catch (err) {
        console.log(err);
      }
    }, 700);

    this.setState({ canSearch: myRef });
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
          <SearchInput
            placeholder="Buscar Documentos |titulo| o |autor|"
            changed={this.searchBarHandler}
          />
          <PaperTable
            data={
              this.state.filteredPapers
                ? this.state.filteredPapers
                : this.state.papers
            }
          />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditPaper;
