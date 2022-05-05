import React from "react";
import ReactPlayer from "react-player";
import { CloseOutlined } from "@ant-design/icons";
import { IMG_URL } from "../config";

import "./Modal.css";

function TrailerModal({
  TrailerModalOpen,
  setTrailerModalOpen,
  trailerUrl,
  ///
  stillCutUrl,
  stillCutModalOpen,
  setStillCutModalOpen,
}) {
  const open = TrailerModalOpen || stillCutModalOpen ? "modal_open" : null;

  const modalClose = (event) => {
    if (event.target.parentNode.className === "detailPage") {
      setTrailerModalOpen(false);
      setStillCutModalOpen(false);
    }
  };
  const modalCloseBtn = () => {
    setTrailerModalOpen(false);
    setStillCutModalOpen(false);
  };

  return (
    <>
      <div className={[`modal ${open}`].join(" ")} onClick={modalClose}>
        <button onClick={modalCloseBtn} className="modalCloseBtn">
          <CloseOutlined />
        </button>
        {TrailerModalOpen && (
          <ReactPlayer
            // className="youtube youtubeModal"
            url={`${trailerUrl}`}
            playing={true}
            width="100%"
            height="60%"
            allowFullScreen
            controls={true}
          />
        )}
        {stillCutModalOpen && (
          <img
            className="stillCutModal"
            src={`${IMG_URL}original${stillCutUrl}`}
          />
        )}
      </div>
    </>
  );
}

export default TrailerModal;
