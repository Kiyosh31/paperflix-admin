import React from "react";
import "./NavigationItems.css";

import NavigationItem from "components/NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className="navigationItems">
      <NavigationItem link="/home">Agregar Documentos</NavigationItem>
      <NavigationItem link="/home">Eliminar Documentos</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
