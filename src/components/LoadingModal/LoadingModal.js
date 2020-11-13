import React from "react";
import "./LoadingModal.css";

import Spinner from "components/Spinner/Spinner";

const LoadingModal = () => {
  return (
    <div>
      <div className="backdrop" />
      <div className="modal">
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingModal;
