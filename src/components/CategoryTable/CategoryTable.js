import Modal from "components/Modal/Modal";
import ModifyCategoryForm from "components/ModifyCategoryForm/ModifyCategoryForm";
import TableButton from "components/TableButton/TableButton";
import React, { useState } from "react";
import "./CategoryTable.css";

const CategoryTable = (props) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [header] = useState(["id", "Categoria", "Accion"]);

  function modalHandler(category) {
    setModalContent(<ModifyCategoryForm category={category} />);

    setModal(!modal);
  }

  const tbodyElements = [];
  for (let key in props.data) {
    tbodyElements.push({
      id_category: props.data[key].id_category,
      category: props.data[key].category,
    });
  }

  const body = tbodyElements.map((category) => (
    <tr key={category.id_category}>
      <td>{category.id_category}</td>
      <td>{category.category}</td>
      <td>
        <TableButton edit clicked={() => modalHandler(category)}>
          Editar
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
      <table className="category__table">
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

export default CategoryTable;
