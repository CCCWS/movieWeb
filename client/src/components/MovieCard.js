import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";

import AOS from "aos";
import "aos/dist/aos.css";

function MovieCard({
  id,
  poster_path,
  name,
  title,
  IMG_URL,
  closeModal,
  onModal,
}) {
  const nav = useNavigate();
  const goDitail = () => {
    nav(`/detail/${id}`);
    {
      onModal && closeModal();
    }
  };

  return (
    <div className="movieCardItem" onClick={goDitail}>
      <div className="movieCarePoster">
        <div className="focusPoster">
          <SearchOutlined />
        </div>

        <img src={poster_path ? `${IMG_URL}w200${poster_path}` : null} />
      </div>

      <div className="movieCardTitle">
        {title}
        {name}
      </div>
    </div>
  );
}

export default React.memo(MovieCard);
