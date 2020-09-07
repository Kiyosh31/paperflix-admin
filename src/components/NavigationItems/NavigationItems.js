import React from "react";
import "./NavigationItems.css";
import NavigationItem from "components/NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className="navigation__items">
      <NavigationItem link="/">Agregar Papers</NavigationItem>
      <NavigationItem link="/">Eliminar Papers</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
