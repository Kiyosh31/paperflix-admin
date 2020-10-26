import React, { useState } from "react";
import "./PaperTable.css";

import Modal from "components/Modal/Modal";
import ModifyPaperForm from "components/ModifyPaperForm/ModifyPaperForm";
import DeleteForm from "components/DeleteForm/DeleteForm";
import Button from "components/Button/Button";

const PaperTable = (props) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [header] = useState([
    "id",
    "Titulo",
    "Descripcion",
    "Autor",
    "URL",
    "Acciones",
  ]);

  function modalHandler(paper, typeModifier) {
    switch (typeModifier) {
      case "edit":
        setModalContent(
          <ModifyPaperForm
            paper={paper}
            categories={props.categories}
            selectedCategory={props.categories.filter(
              (category) => category.id_category === paper.id_category
            )}
          />
        );
        break;

      case "delete":
        setModalContent(<DeleteForm clicked={closeModal} paper={paper} />);
        break;

      default:
        setModalContent(false);
        setModal(false);
    }

    setModal(!modal);
  }

  function closeModal() {
    setModal(false);
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
      <td className="table__content">{paper.id_paper}</td>
      <td className="table__content">{paper.title}</td>
      <td className="table__content">{paper.description}</td>
      <td className="table__content">{paper.author}</td>
      <td className="table__content">
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {paper.url}
        </a>
      </td>
      <td className="table__content">
        <Button edit noContainer clicked={() => modalHandler(paper, "edit")}>
          Editar
        </Button>
        <Button
          delete
          noContainer
          clicked={() => modalHandler(paper.id_paper, "delete")}
        >
          Eliminar
        </Button>
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
