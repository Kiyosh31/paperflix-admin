import React from "react";
import "./NavigationItems.css";

import NavigationItem from "components/NavigationItem/NavigationItem";
import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";

const NavigationItems = () => {
  return (
    <ul className="nav__items">
      <NavigationItem link="/home">
        <Logo />
      </NavigationItem>
      <NavigationItem link="/home">
        <Avatar />
      </NavigationItem>
      <NavigationItem link="/home/create-paper" exact active>
        Cargar Documento
      </NavigationItem>
      <NavigationItem link="/home/delete-paper">
        Eliminar Documento
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
