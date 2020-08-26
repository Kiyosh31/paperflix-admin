import React, { Component } from "react";
import "./App.css";

import instance from "./axios-instance";

class App extends Component {
  state = {
    title: null,
    description: null,
    publication_year: null,
    author: null,
    language: null,
    number_pages: null,
    selectedFile: null,
  };

  inputChangedHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileSelectedHandler = async (event) => {
    const file = event.target.files[0];
    const base64File = await this.convertBase64(file);
    this.setState({ selectedFile: base64File });
    // console.log("estado", this.state.selectedFile);
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  fileUploadHandler = (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append(
    //   "title",
    //   this.state.title,

    //   "pdf",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    const formData = {
      title: this.state.title,
      description: this.state.description,
      publication_year: this.state.publication_year,
      author: this.state.author,
      language: this.state.language,
      number_pages: parseInt(this.state.number_pages),
      selectedFile: this.state.selectedFile,
    };

    console.log("formdata", formData);

    instance
      .post("paper-create/", formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.fileUploadHandler}>
          <input
            type="text"
            placeholder="Titulo"
            name="title"
            onChange={this.inputChangedHandler}
          />
          <input
            type="textarea"
            placeholder="Decripcion"
            name="description"
            onChange={this.inputChangedHandler}
          />
          <input
            type="text"
            placeholder="Año de publicacion"
            name="publication_year"
            onChange={this.inputChangedHandler}
          />
          <input
            type="text"
            placeholder="Autor"
            name="author"
            onChange={this.inputChangedHandler}
          />
          <input
            type="text"
            placeholder="Idioma"
            name="language"
            onChange={this.inputChangedHandler}
          />
          <input
            type="text"
            placeholder="Paginas"
            name="number_pages"
            onChange={this.inputChangedHandler}
          />
          <input type="file" onChange={this.fileSelectedHandler} />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default App;
