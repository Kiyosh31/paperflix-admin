import React from "react";
import "./NavigationItem.css";

import { Link } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className="navigationItem">
      <Link
        to={props.link}
        className={`link ${props.active ? "active" : null}`}
      >
        {props.children}
      </Link>
    </li>
  );
};

export default NavigationItem;
