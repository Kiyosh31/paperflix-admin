import React, { useState } from "react";
import "./PaperTable.css";

import TableButton from "components/TableButton/TableButton";
import Modal from "components/Modal/Modal";
import ModifyForm from "components/ModifyForm/ModifyForm";
import DeleteForm from "components/DeleteForm/DeleteForm";

const PaperTable = (props) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [header] = useState([
    "id",
    "Titulo",
    "Descripcion",
    "Año Publicacion",
    "Autor",
    "URL",
    "Categoria",
    "Acciones",
  ]);

  function modalHandler(paper, typeModifier) {
    switch (typeModifier) {
      case "edit":
        setModalContent(<ModifyForm paper={paper} />);
        break;

      case "delete":
        setModalContent(<DeleteForm id_paper={paper} />);
        break;

      default:
        setModalContent(false);
        setModal(false);
    }

    setModal(!modal);
  }

  const tbodyElements = [];
  for (let key in props.data) {
    tbodyElements.push({
      id_paper: props.data[key].id_paper,
      id_category: props.data[key].id_category,
      title: props.data[key].title,
      description: props.data[key].description,
      publication_year: props.data[key].publication_year,
      author: props.data[key].author,
      url: props.data[key].url,
    });
  }

  const body = tbodyElements.map((paper) => (
    <tr key={paper.id_paper}>
      <td>{paper.id_paper}</td>
      <td>{paper.title}</td>
      <td className="table__description">{paper.description}</td>
      <td>{paper.publication_year}</td>
      <td>{paper.author}</td>
      <td className="table__description">{paper.url}</td>
      <td>{paper.id_category}</td>
      <td>
        <TableButton edit clicked={() => modalHandler(paper, "edit")}>
          Editar
        </TableButton>
        <TableButton
          delete
          clicked={() => modalHandler(paper.id_paper, "delete")}
        >
          Eliminar
        </TableButton>
      </td>
    </tr>
  ));

  return (
    <div>
      {modal && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          {modalContent}
        </Modal>
      )}
      <table className="table">
        <thead>
          <tr>
            {header.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default PaperTable;
