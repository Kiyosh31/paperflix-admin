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
import Button from "components/Button/Button";

import APICalls from "APICalls/APICalls";

class EditPaper extends Component {
  state = {
    papers: null,
    categories: null,
    showModal: true,
    loading: true,
    filteredPapers: null,
    canSearch: null,
    page: 1,
  };

  async componentDidMount() {
    try {
      const fetchedPapers = await APICalls.getPaginatedPapers(this.state.page);
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

    try {
      const fetchedCategories = await APICalls.getAllCategories();
      if (fetchedCategories) {
        this.setState({ categories: fetchedCategories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  searchBarHandler = (event) => {
    const searchText = event.target.value.trim();

    if (this.state.canSearch !== null || this.state.canSearch !== undefined) {
      clearTimeout(this.state.canSearch);
    }

    if (!searchText || searchText === "") {
      this.setState({ filteredPapers: null });
      return;
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

  loadPageHandler = async () => {
    let pageNumber = this.state.page;
    pageNumber = pageNumber + 1;

    this.setState({ showModal: true, loading: true });

    try {
      const fetchedPapers = await APICalls.getPaginatedPapers(pageNumber);
      if (fetchedPapers) {
        let updatedPapers = [...this.state.papers];
        for (let key in fetchedPapers) {
          updatedPapers.push(fetchedPapers[key]);
        }

        this.setState({
          papers: updatedPapers,
          page: pageNumber,
          showModal: false,
          loading: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
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

    console.log("papers en estado", this.state.papers);

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
            categories={this.state.categories}
          />
        </FormBox>
        {!this.state.filteredPapers && (
          <Button clicked={this.loadPageHandler}>Cargar mas</Button>
        )}
        <Footer />
      </div>
    );
  }
}

export default EditPaper;
