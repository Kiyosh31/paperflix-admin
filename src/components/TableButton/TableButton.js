import React from "react";
import "./TableButton.css";

const TableButton = (props) => {
  let btnStyle = ["table__button"];
  if (props.edit) {
    btnStyle.push("table__button__edit");
  }
  if (props.delete) {
    btnStyle.push("table__button__delete");
  }

  return (
    <div>
      <button
        className={btnStyle.join(" ")}
        disabled={props.disabled}
        type={props.btnType}
        onClick={props.clicked}
      >
        {props.children}
      </button>
    </div>
  );
};

export default TableButton;
