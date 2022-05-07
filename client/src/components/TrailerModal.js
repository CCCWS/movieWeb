import React, { useEffect } from "react";
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
  const body = document.querySelector("body");

  useEffect(() => {
    if (TrailerModalOpen || stillCutModalOpen) {
      body.classList.toggle("not-scroll");
    } else {
      body.classList.remove("not-scroll");
    }
    return () => {
      //뒤로가기 등으로 인하여 화면을 벗어나면 스크롤 활성화
      return body.classList.remove("not-scroll");
    };
  }, [
    TrailerModalOpen,
    setTrailerModalOpen,
    stillCutModalOpen,
    setStillCutModalOpen,
  ]);

  const modalClose = (event) => {
    if (event.target.parentNode.className === "detailPage") {
      setTrailerModalOpen(false);
      setStillCutModalOpen(false);
      body.classList.toggle("not-scroll");
    }
  };
  const modalCloseBtn = () => {
    setTrailerModalOpen(false);
    setStillCutModalOpen(false);
    body.classList.toggle("not-scroll");
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
