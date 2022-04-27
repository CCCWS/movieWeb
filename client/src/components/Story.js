import React from "react";

function Story({ overview, tagline }) {
  return (
    <>
      {overview == "" ? (
        <p className="notInfo"> 정보가 없습니다. </p>
      ) : (
        <>
          <div className="tagline">{tagline}</div>
          <p className="overview">{overview}</p>
        </>
      )}
    </>
  );
}

export default Story;
