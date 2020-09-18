import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;
  let validationError = null;

  let invalid = "";
  if (props.invalid && props.touched) {
    invalid = "invalid";
    validationError = <p className="error__message">Ingrese un valor valido</p>;
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
    case "select":
      inputElement = (
        <div>
          <label className="select__label">Categoria</label>
          <select
            className="input__select"
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={`input__search ${invalid}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="input__container">
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
