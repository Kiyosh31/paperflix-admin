import React from "react";
import "./SearchIcon.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
  return (
    <div className="searchbar__container">
      <FontAwesomeIcon
        className={props.white ? "icon__white" : "icon"}
        icon={faSearch}
      />
    </div>
  );
};

export default SearchBar;
