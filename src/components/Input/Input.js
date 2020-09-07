import React from "react";
import "./Input.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  let inputElement = null;

  let invalid = "";
  if (props.invalid && props.touched) {
    invalid = "invalid";
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={`input ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={`input__textarea ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "file":
      inputElement = (
        <div>
          <input
            name="file-input"
            id="file-input"
            className={`input__file ${invalid}`}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <label className="inputfile__label" htmlFor="file-input">
            <FontAwesomeIcon icon={faFilePdf} className="brand__icon" />{" "}
            Selecciona un archivo
          </label>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={`input ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return <div className="input__container">{inputElement}</div>;
};

export default Input;
