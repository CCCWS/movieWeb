import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Logo from "./Logo";

import "./TitleLargeImg.css";

function TitleLargeImg({
  id,
  backdrop_path,
  DetailPage,
  title,
  name,
  rank,
  tv,
  movie,
}) {
  const nav = useNavigate();

  const [logoImg, setLogoImg] = useState([]);

  const getTv = async () => {
    const logo = `${API_URL}tv/${id}/images?api_key=${API_KEY}`;
    const getLogo = await (await fetch(logo)).json();
    setLogoImg(getLogo.logos);
  };

  const getMovie = async () => {
    const logo = `${API_URL}movie/${id}/images?api_key=${API_KEY}`;
    const getLogo = await (await fetch(logo)).json();
    setLogoImg(getLogo.logos);
  };

  useEffect(() => {
    //DetailPage에서 접속했다면 로고는 가져오지 않음
    if (DetailPage === undefined) {
      if (tv === true) {
        getTv();
      } else if (movie === true) {
        getMovie();
      }
    }
  }, []);

  const checkNull = backdrop_path ? `${IMG_URL}original${backdrop_path}` : null;
  const styleDetail = {
    //detail에서 호출했을 경우
    backgroundImage: `linear-gradient(to bottom,
      rgba(31,31,31,0.3)50%,
      rgba(31,31,31,0.6)70%,
      rgba(31,31,31,1)100%), 
  
      linear-gradient(to top,
        rgba(31,31,31,0.3)50%,
        rgba(31,31,31,0.6)70%,
        rgba(31,31,31,1)100%),
      url('${checkNull}')`,
  };

  const styleMain = {
    //main에서 호출했을 경우
    backgroundImage: `linear-gradient(to bottom,
      rgba(31,31,31,0)60%,
      rgba(31,31,31,0.3)80%,
      rgba(31,31,31,1)100%), 

      linear-gradient(to top,
        rgba(31,31,31,0)60%,
        rgba(31,31,31,0.3)80%,
        rgba(31,31,31,1)100%),  
      url('${checkNull}')`,
  };
  const style = DetailPage === true ? styleDetail : styleMain;
  const where = DetailPage === true ? "fromDetail" : "fromMain";

  const goDetail = () => {
    if (tv === true) {
      nav(`/Tvdetail/${id}`);
    } else if (movie === true) {
      nav(`/detail/${id}`);
    }
  };

  return (
    <div className={[`titleLargeImg`, where].join(" ")} style={style}>
      {DetailPage ? null : (
        <>
          <div className="titleName">
            <div className="rank">{`실시간 인기 ${rank + 1}위`}</div>
            {logoImg.length ? (
              <Logo logoImg={logoImg} />
            ) : (
              <div className="not-find-logo">
                {name} {title}
              </div>
            )}

            <button className="goDetailBtn" onClick={goDetail}>
              <ExclamationCircleOutlined /> 상세 정보
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(TitleLargeImg);
