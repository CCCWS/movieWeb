import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieScore from "./MovieScore";
import { SearchOutlined } from "@ant-design/icons";

import img from "../img/poster_none.PNG";
import "./MovieCard.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";

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
  release_date,
}) {
  const nav = useNavigate();
  const [click, setClick] = useState(false);
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

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  useEffect(() => {
    const get = JSON.parse(localStorage.getItem("favorite"));
    if (get !== null && get.length >= 1) {
      const filter =
        title === undefined
          ? get.filter((data) => data.name === name)
          : get.filter((data) => data.title === title);
      if (filter.length === 1) {
        setClick(true);
      }
    }
  }, []);

  return (
    <>
      <div
        className="movieCardItem"
        // data-aos="null"
        // data-aos-anchor-placement="null"
      >
        <div className="movieCarePoster" onClick={goDitail}>
          <div className="hoverPoster">
            <SearchOutlined />
            <div>
              {title}
              {name}
            </div>
            {click && (
              <div>
                <StarFilled />
              </div>
            )}
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
