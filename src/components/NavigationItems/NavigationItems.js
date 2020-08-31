import React from "react";
import "./NavigationItems.css";

import NavigationItem from "components/NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className="navigationItems">
      <NavigationItem>Agregar Documentos</NavigationItem>
      <NavigationItem>Eliminar Documentos</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
