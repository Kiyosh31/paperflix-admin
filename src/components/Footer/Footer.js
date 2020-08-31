import React from "react";
import "./Footer.css";

import SocialLinks from "components/SocialLinks/SocialLinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <SocialLinks />
      <p>
        <FontAwesomeIcon icon={faCopyright} /> 2020 Paperflix, Inc.
      </p>
    </footer>
  );
};

export default Footer;
