import React from "react";
import ReactPlayer from "react-player";

import "./Modal.css";

function TrailerModal({ TrailerModalOpen, setTrailerModalOpen, trailerUrl }) {
  const open = TrailerModalOpen ? "modal_open" : null;

  const close = (event) => {
    if (event.target.parentNode.className === "detailPage") {
      setTrailerModalOpen(false);
    }
  };

  return (
    <>
      <div className={[`modal ${open}`].join(" ")} onClick={close}>
        {TrailerModalOpen && (
          <ReactPlayer
            // data-aos="fade"
            // data-aos-duration="3000"
            // data-aos-once="true"
            className="youtube youtubeModal"
            url={`${trailerUrl}`}
            playing={true}
            width="100%"
            height="450px"
            // allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </>
  );
}

export default TrailerModal;
