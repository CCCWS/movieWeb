import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { CloseOutlined } from "@ant-design/icons";

import "./Modal.css";

function TrailerModal({ TrailerModalOpen, setTrailerModalOpen, trailerUrl }) {
  const open = TrailerModalOpen ? "modal_open" : null;

  const body = document.querySelector("body");

  useEffect(() => {
    if (TrailerModalOpen) {
      // body.classList.add("not-scroll");
    }
  }, [TrailerModalOpen]);

  const modalClose = (event) => {
    //영상 영역 밖을 클릭시 클릭한 곳을 감지하여 modal 닫기
    if (event.target.parentNode.className === "detailPage") {
      setTrailerModalOpen(false);
      // body.classList.remove("not-scroll");
    }
  };

  const modalCloseBtn = () => {
    setTrailerModalOpen(false);
    // body.classList.remove("not-scroll");
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
      </div>
    </>
  );
}

export default TrailerModal;
