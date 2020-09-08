import React, { Component } from "react";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import instance from "axios-instance";
import Title from "components/Title/Title";
import FormBox from "components/FormBox/FormBox";

import isBase64 from "is-base64";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";

const initialState = {
  controls: {
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Titulo",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Descripcion",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    publication_year: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Año de publicacion",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    author: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Autor",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    language: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Idioma",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    number_pages: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Numero de paginas",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    file: {
      elementType: "file",
      elementConfig: {
        type: "file",
        placeholder: "",
      },
      value: "",
      validation: {
        isFile: true,
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
};

class CreatePaper extends Component {
  state = {
    controls: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Titulo",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Descripcion",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      publication_year: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Año de publicacion",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Autor",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      language: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Idioma",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      number_pages: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Numero de paginas",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      file: {
        elementType: "file",
        elementConfig: {
          type: "file",
          placeholder: "",
        },
        value: "",
        validation: {
          isFile: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isFile) {
      isValid = value !== null && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  fileSelectedHandler = async (event, controlName) => {
    const selectedFile = event.target.files[0];
    const base64File = await this.convertBase64(selectedFile);

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: base64File,
        valid: this.checkValidity(
          base64File,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    console.log(updatedControls);

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  clearForm = () => {
    this.setState(initialState);
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
    }

    if (!isBase64(this.state.controls.file.value, { mimeRequired: true })) {
      console.log("No es base64");
      return;
    }

    const formData = {
      title: this.state.controls.title.value,
      description: this.state.controls.description.value,
      publication_year: this.state.controls.publication_year.value,
      author: this.state.controls.author.value,
      language: this.state.controls.language.value,
      number_pages: parseInt(this.state.controls.number_pages.value),
      selectedFile: this.state.controls.file.value,
    };

    // console.log("formdata", formData);

    instance
      .post("paper-create/", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.clearForm();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={
          formElement.config.elementType === "file"
            ? ""
            : formElement.config.value
        }
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={
          formElement.config.elementType === "file"
            ? (event) => this.fileSelectedHandler(event, formElement.id)
            : (event) => this.inputChangedHandler(event, formElement.id)
        }
      />
    ));

    return (
      <div>
        <Toolbar />
        <FormBox>
          <Title home>Agregar Documento</Title>
          <form
            style={{ marginTop: "80px", margin: "20px" }}
            onSubmit={this.submitHandler}
          >
            {form}
            <Button btnType="submit" disabled={!this.state.formIsValid}>
              Enviar
            </Button>
          </form>
        </FormBox>
        <Footer />
      </div>
    );
  }
}

export default CreatePaper;
