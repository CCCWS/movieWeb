import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieScore from "./MovieScore";
import { SearchOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";
import { API_URL, API_KEY, IMG_URL } from "../config";

import img from "../img/poster_none.PNG";
import "./MovieCard.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";

function MovieCard({
  data,
  id,
  name,
  title,
  setModalOpen,
  first_air_date,
  onModal,
  AdvancedSearch,
}) {
  const [readMore, setReadMore] = useInView(); //ref로 지정한 태그를 만나면 true반환

  const nav = useNavigate();
  const [click, setClick] = useState(false);

  const goDitail = (event) => {
    // //movie와 tv는 first_air_date의 유무로 판단
    if (event.target.id === "") {
      nav(`/detail/${event.target.accessKey}`);
    } else {
      nav(`/TvDetail/${event.target.accessKey}`);
    }
    {
      //modal창이 켜져있다면 닫기
      onModal && setModalOpen(false);
    }

    console.log(event);
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
    <div
      className={[
        `movieCard ${onModal && "movieCardModal"} ${
          AdvancedSearch && "AdvancedSearch-movieCard"
        }`,
      ].join(" ")}
    >
      {data.map((data, index) => (
        <div className="movieCardItem" key={index} id={data.first_air_date}>
          <div className="movieCarePoster">
            <div
              className="hoverPoster"
              onClick={goDitail}
              // id={data.first_air_date}
            >
              <div id={data.first_air_date} accessKey={data.id}>
                {data.title}
                {data.name}
              </div>

              {/* {click && (
                <div>
                  <StarFilled />
                </div>
              )} */}
            </div>

            <div className="movieCardScore">
              <MovieScore vote_average={data.vote_average} MovieCard={true} />
            </div>

            {data.poster_path === null ? (
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
                  backgroundImage: `url('${IMG_URL}w300${data.poster_path}')`,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(MovieCard);
