import React, { useState } from "react";
import img from "../img/poster_none.PNG";
import "./SeasonInfo.css";
import { useNavigate } from "react-router-dom";
import SelectBox from "./SelectBox";

function SeasonInfo({ season, IMG_URL, name }) {
  const nav = useNavigate();
  const [selectValue, setSelectValue] = useState(0);
  const goDetail = (event) => {
    nav(`${event.target.id}`, { state: name });
  };

  return (
    <>
      <SelectBox
        data={season}
        setSelectValue={setSelectValue}
        selectValue={selectValue}
      />

      <div className="seasonBox">
        <div className="seasonImg">
          {season[selectValue].poster_path === null ? (
            // <div className="not-seasonImg">
            //   <InfoCircleOutlined />
            // </div>
            <img src={`${img}`} />
          ) : (
            <img src={`${IMG_URL}w500${season[selectValue].poster_path}`} />
          )}
        </div>

        <div className="seasonInfo">
          <div
            className="seasonName"
            onClick={goDetail}
            id={season[selectValue].season_number}
          >
            {season[selectValue].name}
          </div>

          <div className="seasonDate">
            {`${
              season[selectValue].air_date === null
                ? "미정"
                : season[selectValue].air_date
            } / ${season[selectValue].episode_count} 에피소드`}
          </div>

          <div>
            {season[selectValue].overview == "" ? (
              <p className="notInfo"> 정보가 없습니다. </p>
            ) : (
              <>
                <div className="seasonOverview">
                  {season[selectValue].overview}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SeasonInfo;
