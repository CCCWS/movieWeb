import React from "react";

import "./TitleLargeImg.css";

function TitleLargeImg({ IMG_URL, backdrop_path, title }) {
  const img = {
    backgroundImage: `linear-gradient(to bottom,
      rgba(31,31,31,0)60%,
      rgba(31,31,31,0.1)70%,
      rgba(31,31,31,1)100%), 

      linear-gradient(to top,
        rgba(31,31,31,0)60%,
        rgba(31,31,31,0.1)70%,
        rgba(31,31,31,1)100%), 
      url('${IMG_URL}original${backdrop_path}')`,
  };

  return (
    <>
      <div className="titleLargeImg" style={img}>
        <div className="info">
          {/* <div>{title}</div> */}
        </div>
      </div>
    </>
  );
}

export default React.memo(TitleLargeImg);
