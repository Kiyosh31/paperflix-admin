import React from "react";
import "./FormBox.css";

const FormBox = (props) => {
  return (
    <div className={`form__box ${props.fill && "fill"}`}>{props.children}</div>
  );
};

export default FormBox;
