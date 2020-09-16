import React from "react";
import "./SearchInput.css";

const SearchInput = (props) => {
  return (
    <div className="input__search-container">
      <input
        className="input__search"
        placeholder={props.placeholder}
        onChange={props.changed}
        value={props.value}
      />
    </div>
  );
};

export default SearchInput;
