import React from "react";
import "./NavigationItem.css";
import { Link } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className="item">
      <Link className="link" to={props.link}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavigationItem;
