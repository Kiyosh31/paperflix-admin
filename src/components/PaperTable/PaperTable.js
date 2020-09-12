import React, { useState } from "react";
import "./PaperTable.css";

import TableButton from "components/TableButton/TableButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal/Modal";
import PaperFile from "components/PaperFile/PaperFile";
import ModifyForm from "components/ModifyForm/ModifyForm";
import DeleteForm from "components/DeleteForm/DeleteForm";

const PaperTable = (props) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  function modalHandler(paper, typeModifier) {
    switch (typeModifier) {
      case "file":
        setModalContent(<PaperFile id_paper={paper} />);
        break;

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
      title: props.data[key].title,
      description: props.data[key].description,
      publication_year: props.data[key].publication_year,
      author: props.data[key].author,
      language: props.data[key].language,
      number_pages: props.data[key].number_pages,
    });
  }

  const body = tbodyElements.map((paper) => (
    <tr key={paper.id_paper}>
      <td>{paper.id_paper}</td>
      <td>{paper.title}</td>
      <td className="table__description">{paper.description}</td>
      <td>{paper.publication_year}</td>
      <td>{paper.author}</td>
      <td>{paper.language}</td>
      <td>
        <TableButton clicked={() => modalHandler(paper.id_paper, "file")}>
          <FontAwesomeIcon icon={faFilePdf} />
        </TableButton>
      </td>
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
            {props.header.map((head, index) => (
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
