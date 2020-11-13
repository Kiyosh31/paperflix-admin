import React from "react";
import "./Text.css";

const Text = (props) => {
  return <p className="text">{props.children}</p>;
};

export default Text;
