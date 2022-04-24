import React from "react";
import { useNavigate } from "react-router-dom";


import { SearchOutlined } from "@ant-design/icons";

function MovieCard({ id, poster_path, name, title, IMG_URL }) {
  const nav = useNavigate();
  const goDitail = () => {
    nav(`./detail/${id}`);
  };
  return (

      <div className="movieCardItem" onClick={goDitail}>
        <div className="movieCarePoster">
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
