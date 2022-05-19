import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieScore from "./MovieScore";
import { SearchOutlined } from "@ant-design/icons";
import img from "../img/poster_none.PNG";
import "./MovieCard.css";

import AOS from "aos";
import "aos/dist/aos.css";

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
  const localData = {
    id: id,
    title: title,
    name: name,
    poster_path: poster_path,
    IMG_URL: IMG_URL,
    vote_average: vote_average,
    first_air_date: first_air_date,
    release_date: release_date,
  };

  const get = JSON.parse(localStorage.getItem("recentView"));

  const setLocalData = () => {
    const filterGet = get.filter((data) => data.id !== localData.id);
    localStorage.setItem(
      "recentView",
      JSON.stringify([{ ...localData }, ...filterGet])
    );
  };

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

    //localStorge에 데이터가 없을 경우
    // if (get === null) {
    //   localStorage.setItem("recentView", JSON.stringify([{ ...localData }]));
    // } else {
    //   //localStorge의 데이터가 6개가 있을 경우
    //   if (get.length === 6) {
    //     //이미 항목에 있는 데이터라면 지우고 다시 추가해서 최상단으로 갱신
    //     if (get.filter((data) => data.id === localData.id).length === 1) {
    //       setLocalData();

    //       //항목에 있는 데이터가 아니면 맨 뒤의 데이터를 지우고 새로운 데이터 추가
    //     } else {
    //       get.pop();
    //       setLocalData();
    //     }
    //   } else {
    //     //6개가 아닐경우 데이터만 추가
    //     setLocalData();
    //   }
    // }
  };

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <>
      <div
        className="movieCardItem"
        onClick={goDitail}
        // data-aos="null"
        // data-aos-anchor-placement="null"
      >
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
