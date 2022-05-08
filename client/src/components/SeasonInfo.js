import React, { useState } from "react";
import "./SeasonInfo.css";

function SeasonInfo({ season, IMG_URL }) {
  const [selectValue, setSelectValue] = useState(0);

  const select = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      <select className="selectSeason" onChange={select}>
        {season.map((data, index) => (
          <option
            className="selectSeasonOp"
            key={index}
            value={season.indexOf(data)}
          >
            {data.name}
          </option>
        ))}
      </select>

      <div className="seasonBox">
        <div className="seasonImg">
          {season[selectValue].poster_path === null ? null : (
            <img src={`${IMG_URL}w500${season[selectValue].poster_path}`} />
          )}
        </div>

        <div className="seasonInfo">
          <div className="seasonName">{season[selectValue].name}</div>

          <div className="seasonDate">
            {`${
              season[selectValue].air_date === null
                ? "미정"
                : season[selectValue].air_date
            } / ${season[selectValue].episode_count} 에피소드`}
          </div>

          <div className="seasonOverview">
            {season[selectValue].overview == "" ? (
              <p className="notInfo"> 정보가 없습니다. </p>
            ) : (
              <>
                <div className="overview">
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
