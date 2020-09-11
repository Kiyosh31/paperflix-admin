import React, { useState, useEffect } from "react";
import "./PaperFile.css";

import instance from "axios-instance";

const PaperFile = (props) => {
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const payload = {
      id_paper: props.id_paper,
    };

    instance
      .post("paper/", payload)
      .then((response) => {
        setPaper(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <embed
        width="500"
        height="600"
        src={`data:application/pdf;base64,${paper}`}
        type="application/pdf"
      />
    </div>
  );
};

export default PaperFile;
