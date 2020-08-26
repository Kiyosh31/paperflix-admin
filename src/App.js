import React, { Component } from "react";
import "./App.css";
import axios from "axios";

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
    console.log("title", this.state.title);
    console.log("description", this.state.description);
    console.log("publication_year", this.state.publication_year);
    console.log("author", this.state.author);
    console.log("language", this.state.language);
    console.log("number_pages", this.state.number_pages);
    console.log("selectedFile", this.state.selectedFile);
    // const formData = new FormData();
    // formData.append(
    //   "pdf",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    // console.log("estado", this.state.selectedFile);

    // axios
    //   .post("http://127.0.0.1:8000/api/paper-create/", formData, {
    //     onUploadProgress: (progressEvent) => {
    //       console.log(
    //         "Upload progress" +
    //           Math.round((progressEvent.loaded / progressEvent.total) * 100) +
    //           "%"
    //       );
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
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
