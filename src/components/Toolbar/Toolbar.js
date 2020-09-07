import React from "react";
import "./Toolbar.css";

import NavigationItems from "components/NavigationItems/NavigationItems";

const Toolbar = () => {
  return (
    <header className="toolbar">
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
