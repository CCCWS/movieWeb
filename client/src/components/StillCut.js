import React, { useState } from "react";
import { IMG_URL } from "../config";

import "./StillCut.css";

function StillCut({ stillCut, setStillCutUrl, setStillCutModalOpen }) {
  const [click, setClick] = useState(false);

  const stillCut1 = stillCut.slice(0, 12);
  const stillCut2 = stillCut.slice(13);

  const onClick = () => {
    setClick(!click);
  };

  const imgClick = (event) => {
    setStillCutUrl(event.target.title);
    setStillCutModalOpen(true);
  };

  return (
    <>
      <div className="stillCutBox">
        <StillCutImg data={stillCut1} imgClick={imgClick} />
        {click ? <StillCutImg data={stillCut2} imgClick={imgClick} /> : null}
      </div>

      {stillCut2.length > 0 ? (
        <div className="moreBtn">
          <button onClick={onClick}>{click ? "닫기" : "더보기"}</button>
        </div>
      ) : null}
    </>
  );
}

export default StillCut;

const StillCutImg = ({ data, imgClick }) => {
  return (
    <>
      {data.map((data, index) => (
        <img
          onClick={imgClick}
          key={index}
          title={data.file_path}
          className="stillCutImg"
          src={`${IMG_URL}w300${data.file_path}`}
        />
      ))}
    </>
  );
};
