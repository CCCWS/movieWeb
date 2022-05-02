import React from "react";

import "./Modal.css";

function TrailerModal({ TrailerModalOpen, setTrailerModalOpen, trailerUrl }) {
  const open = TrailerModalOpen ? "modal_open" : null;

  const test = (event) => {
    if (event.target.parentNode.className == "detailPage") {
      setTrailerModalOpen(false);
    }
  };

  return (
    <>
      <div className={[`modal ${open}`].join(" ")} onClick={test}>
        {TrailerModalOpen && (
          <iframe
            // data-aos="fade"
            // data-aos-duration="3000"
            // data-aos-once="true"
            className="youtube youtubeModal"
            src={`${trailerUrl}?autoplay=1`}
            allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </>
  );
}

export default TrailerModal;
