import React from "react";

import "./Modal.css";

function TrailerModal({ TrailerModalOpen, setTrailerModalOpen, trailerUrl }) {
  const open = TrailerModalOpen ? "modal_open" : null;

  const test = (event) => {
    if (event.target.parentNode.className == "detailPage") {
      setTrailerModalOpen(false);
    }
  };
  console.log(trailerUrl);
  return (
    <>
      {TrailerModalOpen === true && (
        <div className={[`modal ${open}`].join(" ")} onClick={test}>
          <div className="item">
            <iframe
              className="youtube"
              src={`${trailerUrl}`}
              // allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TrailerModal;
