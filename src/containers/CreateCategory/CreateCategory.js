import React, { Component } from "react";

import Footer from "components/Footer/Footer";
import Toolbar from "components/Toolbar/Toolbar";
import FormBox from "components/FormBox/FormBox";
import Title from "components/Title/Title";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import CreatedContent from "components/CreatedContent/CreatedContent";

import APICalls from "APICalls/APICalls";

const initialState = {
  controls: {
    category: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Categoria",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
  },
  showModa: false,
};
class CreateCategory extends Component {
  state = {
    controls: {
      category: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Categoria",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    showModal: false,
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

  clearForm = () => {
    this.setState(initialState);
  };

  submitHandler = async (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
    }

    const payload = {
      category: this.state.controls.category.value,
    };

    try {
      const fetchedNewCategory = await APICalls.createNewCategory(payload);
      if (fetchedNewCategory) {
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
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
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
          <CreatedContent title="Categoria" clicked={this.modalHandler}>
            Categoria creada con exito!
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
        <FormBox fill>
          <Title>Crear Categoria</Title>
          <form onSubmit={this.submitHandler}>
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

export default CreateCategory;
