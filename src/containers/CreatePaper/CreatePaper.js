import React, { Component } from "react";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Title from "components/Title/Title";
import FormBox from "components/FormBox/FormBox";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Modal from "components/Modal/Modal";
import CreatedContent from "components/CreatedContent/CreatedContent";

import APICalls from "APICalls/APICalls";

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
        maxLength: 255,
      },
      valid: false,
      touched: false,
    },
    publication_year: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Año de publicacion yyyy-mm-dd",
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
    url: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "URL",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    category: {
      elementType: "select",
      elementConfig: {
        // options: [{ value: "", displayValue: "Ciencia" }],
        options: [],
      },
      value: "",
      valid: true,
    },
  },
  formIsValid: false,
  showModal: false,
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
          maxLength: 255,
        },
        valid: false,
        touched: false,
      },
      publication_year: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Año de publicacion yyyy-mm-dd",
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
      url: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "URL",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      category: {
        elementType: "select",
        elementConfig: {
          // options: [{ value: "", displayValue: "Ciencia" }],
          options: [],
        },
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    showModal: false,
  };

  categoryListhandler = (categoryList) => {
    let categoryUpdated = { ...this.state.controls.category };

    for (let key in categoryList) {
      categoryUpdated.elementConfig.options.push({
        value: categoryList[key].id_category,
        displayValue: categoryList[key].category,
      });
    }
    this.setState({ category: categoryUpdated });
  };

  async componentDidMount() {
    try {
      const fetchedCategories = await APICalls.getAllCategories();
      if (fetchedCategories) {
        this.categoryListhandler(fetchedCategories);
      }
    } catch (err) {
      console.log(err);
    }
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

  clearForm = () => {
    this.setState(initialState);
    this.componentDidMount();
  };

  submitHandler = async (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
    }

    const payload = {
      id_category: this.state.controls.category.value,
      title: this.state.controls.title.value,
      description: this.state.controls.description.value,
      publication_year: this.state.controls.publication_year.value,
      author: this.state.controls.author.value,
      url: this.state.controls.url.value,
    };

    try {
      const fetchedNewPaper = await APICalls.createNewPaper(payload);
      if (fetchedNewPaper) {
        this.clearForm();
        this.modalHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
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

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosedByBackdrop={this.modalHandler}
        >
          <CreatedContent title="Documento" clicked={this.modalHandler}>
            Documento creado con exito!
          </CreatedContent>
        </Modal>
      );
    } else {
      modal = null;
    }

    return (
      <div>
        <Toolbar />
        {modal}
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
