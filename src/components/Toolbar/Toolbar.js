import React from "react";
import "./Toolbar.css";

import DrawerToggleButton from "components/DrawerToggleButton/DrawerToggleButton";
import Logo from "assets/img/logo.png";
import Avatar from "assets/img/avatar.png";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <Link to="/" className="link">
            <img className="logo" src={Logo} alt="Paperflix-logo" />
          </Link>
        </div>
        <div className="spacer"></div>
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <Link to="/" className="link">
                <img className="avatar" src={Avatar} alt="Paperflix-avatar" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
