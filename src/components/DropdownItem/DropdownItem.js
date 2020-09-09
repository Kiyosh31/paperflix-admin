import React from "react";
import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = (props) => {
  return (
    <li className="dropdown__item">
      <Link to={props.link}>
        {props.icon} {props.children}
      </Link>
    </li>
  );
};

export default DropdownItem;
