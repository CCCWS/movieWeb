import React, { useState } from "react";
import {
  InfoCircleOutlined,
  CaretDownFilled,
  CaretUpFilled,
} from "@ant-design/icons";

import "./SeasonInfo.css";

function SeasonInfo({ season, IMG_URL }) {
  const [selectValue, setSelectValue] = useState(0);
  const [click, setClick] = useState(false);

  const select = (event) => {
    setSelectValue(event.target.value);
    setClick(!click);
  };

  const test = () => {
    setClick(!click);
  };

  return (
    <>
      {/* <button onClick={test}>test</button>
      <div className="test" onClick={test}>
        <div>
          {season.map((data, index) => (
            <ul
              key={index}
              value={season.indexOf(data)}
              className={click ? "abc" : "bca"}
            >
              <li className="testitem">{data.name}</li>
            </ul>
          ))}
        </div>
      </div> */}
      <div style={{ position: "relative" }}>
        <div className="seasonSelectBox" onClick={test}>
          {season[selectValue].name}{" "}
          {click ? <CaretUpFilled /> : <CaretDownFilled />}
        </div>
        <ul
          className={[
            `seasonSelect ${click ? "seasonSelectOpen" : "seasonSelectClose"}`,
          ].join(" ")}
          onChange={select}
        >
          {season.map((data, index) => (
            <li
              onClick={select}
              key={index}
              value={season.indexOf(data)}
              className="seasonSelectValue"
            >
              {data.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="seasonBox">
        <div className="seasonImg">
          {season[selectValue].poster_path === null ? (
            <div className="not-seasonImg">
              <InfoCircleOutlined />
            </div>
          ) : (
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
