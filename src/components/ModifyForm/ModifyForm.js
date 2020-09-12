import React, { Component } from "react";
import "./ModifyForm.css";

import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import instance from "axios-instance";

class ModifyForm extends Component {
  state = {
    controls: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Titulo",
        },
        value: this.props.paper.description,
        validation: {
          required: true,
          minLength: 5,
        },
        valid: true,
        touched: true,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Descripcion",
        },
        value: this.props.paper.description,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 255,
        },
        valid: true,
        touched: true,
      },
      publication_year: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Año de publicacion",
        },
        value: this.props.paper.publication_year,
        validation: {
          required: true,
          minLength: 3,
        },
        valid: true,
        touched: true,
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Autor",
        },
        value: this.props.paper.author,
        validation: {
          required: true,
          minLength: 5,
        },
        valid: true,
        touched: true,
      },
      language: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Idioma",
        },
        value: this.props.paper.language,
        validation: {
          required: true,
          minLength: 5,
        },
        valid: true,
        touched: true,
      },
      number_pages: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Numero de paginas",
        },
        value: this.props.paper.number_pages,
        validation: {
          required: true,
          minLength: 3,
        },
        valid: true,
        touched: true,
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
      category: {
        elementType: "select",
        elementConfig: {
          options: [
            // { value: "uno", displayValue: "Rapido" },
          ],
        },
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
  };

  getCategoryList = () => {
    instance
      .get("category-list/")
      .then((response) => {
        if (response.status === 200) {
          let categoryUpdated = { ...this.state.controls.category };
          let categoryList = response.data;

          for (let key in categoryList) {
            categoryUpdated.elementConfig.options.push({
              value: categoryList[key].category,
              displayValue: categoryList[key].category,
            });
          }
          this.setState({ category: categoryUpdated });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCategoryList();
  }

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

    // console.log(updatedControls);

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

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
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

    instance
      .put(`paper-update/${this.props.paper.id_paper}/`, formData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.location.reload();
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
        <Title home>Editar Documento</Title>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="submit" disabled={!this.state.formIsValid}>
            Guardar
          </Button>
        </form>
      </div>
    );
  }
}

export default ModifyForm;
