import Title from "components/Title/Title";
import "./DeleteForm.css";

import React from "react";
import TableButton from "components/TableButton/TableButton";
import instance from "axios-instance";

const DeleteForm = (props) => {
  function onSubmit(event) {
    event.preventDefault();

    instance
      .delete(`paper-delete/${props.id_paper}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Eliminado correctamente");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Title>Eliminar Documento</Title>
      <p>Esta seguro que desea eliminar este documento?</p>
      <form onSubmit={onSubmit}>
        <TableButton delete>Eliminar</TableButton>
      </form>
    </div>
  );
};

export default DeleteForm;
