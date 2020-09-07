import React from "react";
import "./NavigationItem.css";

import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className="nav__item">
      <NavLink
        to={props.link}
        className={`nav__item-link ${props.active ? "active" : null}`}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
