import React from "react";
import "./NavigationItems.css";

import NavigationItem from "components/NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className="nav__items">
      <NavigationItem link="/create-paper" strict active>
        Cargar Documento
      </NavigationItem>
      <NavigationItem link="/edit-paper" strict>
        Editar Documento
      </NavigationItem>
      <NavigationItem link="/delete-paper" strict>
        Eliminar Documento
      </NavigationItem>
      <NavigationItem link="/create-category" strict>
        Crear Categoria
      </NavigationItem>
      <NavigationItem link="/edit-category" strict>
        Editar Categoria
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
