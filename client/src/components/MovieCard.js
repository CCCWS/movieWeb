import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";

import AOS from "aos";
import "aos/dist/aos.css";

function MovieCard({ id, poster_path, name, title, IMG_URL }) {
  const nav = useNavigate();
  const goDitail = () => {
    nav(`./detail/${id}`);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="movieCardItem" onClick={goDitail}>
      <div
        className="movieCarePoster"
        // data-aos="slide-up"
        // data-aos-duration="1000"
        // data-aos-once="false"
      >
        <div className="focusPoster">
          <SearchOutlined />
        </div>

        <img src={`${IMG_URL}w200${poster_path}`} />
      </div>

      <div className="movieCardTitle">
        {title}
        {name}
      </div>
    </div>
  );
}

export default React.memo(MovieCard);
