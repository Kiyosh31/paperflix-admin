import React from "react";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  let drawerClasses = ["side-drawer"];
  if (props.show) {
    drawerClasses.push("open");
  }

  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <a href="/">Agregar Papers</a>
        </li>
        <li>
          <a href="/">Eliminar Papers</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
