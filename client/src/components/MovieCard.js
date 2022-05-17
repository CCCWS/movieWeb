import React from "react";
import { useNavigate } from "react-router-dom";
import MovieScore from "./MovieScore";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import img from "../img/poster_none.PNG";
import "./MovieCard.css";

function MovieCard({
  id,
  poster_path,
  name,
  title,
  IMG_URL,
  setModalOpen,
  onModal,
  vote_average,
  first_air_date,
}) {
  const nav = useNavigate();
  const goDitail = () => {
    //movie와 tv는 first_air_date의 유무로 판단
    if (first_air_date !== undefined) {
      nav(`/TvDetail/${id}`);
    } else {
      nav(`/detail/${id}`);
    }
    {
      //modal창이 켜져있다면 닫기
      onModal && setModalOpen(false);
    }
  };

  return (
    <>
      <div className="movieCardItem" onClick={goDitail}>
        <div className="movieCarePoster">
          <div className="hoverPoster">
            <SearchOutlined />
            <div>
              {title}
              {name}
            </div>
          </div>

          <div className="movieCardScore">
            <MovieScore vote_average={vote_average} MovieCard={true} />
          </div>

          {poster_path === null ? (
            <div
              className="posterImg posterImg-not"
              style={{
                backgroundImage: `url(${img})`,
              }}
            ></div>
          ) : (
            <div
              className="posterImg"
              style={{
                backgroundImage: `url('${IMG_URL}w300${poster_path}')`,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(MovieCard);
