import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ id, poster_path, name, title, IMG_URL }) {
  const nav = useNavigate();
  const idd = () => {
    nav(`./detail/${id}`);
  };
  return (
    <div>
      <img onClick={idd} src={`${IMG_URL}w200${poster_path}`} />
      <div>
        {title}
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
