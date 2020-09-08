import React from "react";
import "./Subtitle.css";

const Subtitle = (props) => {
  return (
    <div>
      <h2 className="subtitle">{props.children}</h2>
    </div>
  );
};

export default Subtitle;
