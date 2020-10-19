import React, { useState } from "react";
import "./Dropdown.css";

import Modal from "components/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import auth from "auth";
import UserSettings from "components/UserSettings/UserSettings";

const Dropdown = () => {
  const [modal, setModal] = useState(false);

  let history = useHistory();

  function userSettingsHandler() {
    setModal(!modal);
  }

  async function logoutHandler() {
    try {
      await auth.logout();
      auth.deleteCookie();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dropdown">
      <ul>
        <li onClick={userSettingsHandler}>
          {" "}
          <FontAwesomeIcon className="dropdown__icon" icon={faCog} />
          Cuenta
        </li>
        <li onClick={logoutHandler}>
          <FontAwesomeIcon className="dropdown__icon" icon={faSignOutAlt} />
          Cerrar Sesion
        </li>
      </ul>
      {modal && (
        <Modal show={modal} modalClosedByBackdrop={userSettingsHandler}>
          <UserSettings />
        </Modal>
      )}
    </div>
  );
};

export default Dropdown;
