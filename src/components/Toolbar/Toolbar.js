import React from "react";
import "./Toolbar.css";

import Logo from "components/Logo/Logo";
import NavigationItems from "components/NavigationItems/NavigationItems";
import Avatar from "components/Avatar/Avatar";
import SearchBar from "components/SearchBar/SearchBar";

const Toolbar = () => {
  return (
    <header className="toolbar">
      <Logo />
      <div>
        <NavigationItems />
      </div>
      <nav>
        <SearchBar />
        <Avatar />
      </nav>
    </header>
  );
};

export default Toolbar;
