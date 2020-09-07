import React from "react";
import "./SideDrawer.css";

import NavigationItems from "components/NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  let drawerClasses = ["side-drawer"];
  if (props.show) {
    drawerClasses.push("open");
  }

  return (
    <nav className={drawerClasses.join(" ")}>
      <NavigationItems />
    </nav>
  );
};

export default SideDrawer;
