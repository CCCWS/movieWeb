import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import img from "../img/still_none.PNG";
import "./SeasonDetailInfo.css";

function SeasonDetailInfo() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { value } = useParams();

  const [loading, setLoading] = useState(true);
  const [seasonName, setSeasonName] = useState();
  const [episode, setEpisode] = useState([]);
  const url = `${API_URL}tv/${value}/season/${id}?api_key=${API_KEY}&language=ko`;

  const getApi = async () => {
    const res = await (await fetch(url)).json();

    setSeasonName(res.name);
    setEpisode(res.episodes);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
  }, []);

  const goBack = () => {
    nav(-1);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="SeasonDetailInfo">
          <div onClick={goBack} className="season-title">
            <ArrowLeftOutlined />
            {`${state} ${seasonName}`}
          </div>

          {episode.map((data) => (
            <div key={data.id} className="SeasonDetailInfo-info">
              <div className="SeasonDetailInfo-img">
                {data.still_path === null ? (
                  <img src={`${img}`} />
                ) : (
                  <img src={`${IMG_URL}w500${data.still_path}`} />
                )}
              </div>

              <div className="SeasonDetailInfo-content">
                <div>{`${data.episode_number}화 "${data.name}"`}</div>
                <div className="SeasonDetailInfo-content-date">{`${
                  data.air_date === "" ? "미정" : data.air_date
                } / 
                ${data.runtime === "" ? "미정" : data.runtime}분`}</div>
                <div>
                  {data.overview === "" ? "정보가 없습니다." : data.overview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SeasonDetailInfo;
