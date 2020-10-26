import React, { Component } from "react";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import CategoryTable from "components/CategoryTable/CategoryTable";
import SearchInput from "components/SearchInput/SearchInput";

import APICalls from "APICalls/APICalls";

class EditCategory extends Component {
  state = {
    categories: null,
    loading: true,
    showModal: true,
    filteredCategories: null,
    search: null,
  };

  async componentDidMount() {
    try {
      const fetchedCategories = await APICalls.getAllCategories();
      if (fetchedCategories) {
        this.setState({
          categories: fetchedCategories,
          showModal: false,
          loading: false,
        });
      }
    } catch (err) {
      this.setState({ showModal: false, loading: false });
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

    if (!searchText) {
      this.setState({ filteredCategories: null });
    }

    const myRef = setTimeout(async () => {
      const payload = {
        search: searchText,
      };

      try {
        const fetchedSearch = await APICalls.searchCategories(payload);
        if (fetchedSearch) {
          this.setState({ filteredCategories: fetchedSearch });
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
          <Title>Editar Categoria</Title>
          <SearchInput
            placeholder="Buscar categoria"
            changed={this.searchBarHandler}
          />
          <CategoryTable
            data={
              this.state.filteredCategories
                ? this.state.filteredCategories
                : this.state.categories
            }
          />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditCategory;
