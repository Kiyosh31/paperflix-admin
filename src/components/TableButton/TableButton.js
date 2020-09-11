import React from "react";
import "./TableButton.css";

const TableButton = (props) => {
  let btnStyle = ["button"];
  if (props.edit) {
    btnStyle.push("button__edit");
  }
  if (props.delete) {
    btnStyle.push("button__delete");
  }

  return (
    <div className="">
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
