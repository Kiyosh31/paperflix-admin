import React from "react";
import "./Table.css";

import TableButton from "components/TableButton/TableButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Table = (props) => {
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
        <TableButton>
          <FontAwesomeIcon icon={faFilePdf} />
        </TableButton>
      </td>
      <td>
        <TableButton edit>Editar</TableButton>
        <TableButton delete>Eliminar</TableButton>
      </td>
    </tr>
  ));

  return (
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
  );
};

export default Table;
