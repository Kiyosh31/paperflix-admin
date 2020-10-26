import React from "react";
import "./DeleteForm.css";

import Title from "components/Title/Title";
import Button from "components/Button/Button";
import APICalls from "APICalls/APICalls";

const DeleteForm = (props) => {
  async function submitHandler(event) {
    event.preventDefault();

    try {
      const fetchedDeletedPaper = await APICalls.deletePaper(props.paper);
      if (fetchedDeletedPaper) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Title>Eliminar Documento</Title>
      <p>Esta seguro que desea eliminar este documento?</p>
      <Button delete noContainer clicked={submitHandler}>
        Eliminar
      </Button>
      <Button edit noContainer clicked={props.clicked}>
        Cancelar
      </Button>
    </div>
  );
};

export default DeleteForm;
