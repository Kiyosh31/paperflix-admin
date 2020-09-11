import React, { useState } from "react";
import "./Table.css";

import TableButton from "components/TableButton/TableButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal/Modal";
import PaperFile from "components/PaperFile/PaperFile";

const Table = (props) => {
  const [modal, setModal] = useState(false);

  function modalHandler() {
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
    });
  }

  const body = tbodyElements.map((paper) => (
    <tr key={paper.id_paper}>
      <td>{paper.id_paper}</td>
      <td>{paper.title}</td>
      <td>{paper.description}</td>
      <td>{paper.publication_year}</td>
      <td>{paper.author}</td>
      <td>{paper.language}</td>
      <td>
        <TableButton clicked={() => modalHandler(paper.id_paper)}>
          <FontAwesomeIcon icon={faFilePdf} />
        </TableButton>
      </td>
      <td>
        <TableButton edit clicked={() => modalHandler(paper)}>
          Editar
        </TableButton>
        <TableButton delete>Eliminar</TableButton>
      </td>
    </tr>
  ));

  return (
    <div>
      {modal && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperFile />
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

export default Table;
