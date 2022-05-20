import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../config";

function SearchBarResult({
  id,
  poster_path,
  title,
  name,
  first_air_date,
  release_date,
  setValue,
  Category,
}) {
  const nav = useNavigate();
  const goDetail = () => {
    if (first_air_date !== undefined) {
      nav(`/TvDetail/${id}`);
    } else {
      nav(`/detail/${id}`);
    }

    if (Category !== true) {
      setValue("");
    }
  };
  return (
    <div className="searchInfo" onClick={goDetail}>
      <img
        className="searchImg"
        src={poster_path ? `${IMG_URL}w200${poster_path}` : null}
      />
      <div className="searchTitle">
        <div>
          {title} {name}
        </div>
        <div>
          {first_air_date ? `TV · ${first_air_date}` : `영화 · ${release_date}`}
        </div>
      </div>
    </div>
  );
}

export default SearchBarResult;
