import React, { Component } from "react";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import CategoryTable from "components/CategoryTable/CategoryTable";
import SearchBar from "components/SearchIcon/SearchIcon";
import SearchInput from "components/SearchInput/SearchInput";

import APICalls from "APICalls/APICalls";

class EditCategory extends Component {
  state = {
    categories: null,
    loading: true,
    showModal: true,
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

    let filteredCategories = null;
    if (this.state.search === "" || this.state.search === null) {
      filteredCategories = this.state.categories;
    } else {
      filteredCategories = this.state.categories.filter((category) => {
        return category.category
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      });
    }

    return (
      <div>
        {modal}
        <Toolbar />
        <SearchBar />
        <FormBox>
          <Title>Editar Categoria</Title>
          <SearchInput
            placeholder="Buscar categoria"
            changed={this.searchHandler}
          />
          <CategoryTable data={filteredCategories} />
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default EditCategory;
