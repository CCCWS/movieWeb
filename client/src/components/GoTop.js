import React from "react";
import { DoubleRightOutlined } from "@ant-design/icons";

import "./GoTop.css";

function GoTop() {
  const goTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="goTop" onClick={goTop}>
      <DoubleRightOutlined rotate={-90} />
    </div>
  );
}

export default GoTop;
