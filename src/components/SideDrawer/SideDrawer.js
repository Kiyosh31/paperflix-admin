import React from "react";
import "./SideDrawer.css";

import Logo from "components/Logo/Logo";
import NavigationItems from "components/NavigationItems/NavigationItems";

const SideDrawer = () => {
  return (
    <div className="sideDrawer">
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
