import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import img from "../img/poster_none.PNG";
import "./SeasonInfo.css";
import { useNavigate } from "react-router-dom";

function SeasonInfo({ season, IMG_URL, id }) {
  const nav = useNavigate();
  const [selectValue, setSelectValue] = useState(0);
  const [click, setClick] = useState(false);

  const select = (event) => {
    setSelectValue(event.target.value);
    setClick(!click);
  };

  const open = () => {
    setClick(!click);
  };

  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const clickOutside = ({ target }) => {
    if (
      click &&
      !selectRef1.current.contains(target) &&
      !selectRef2.current.contains(target)
    )
      setClick(false);
  };

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [click]);

  const goDetail = (event) => {
    console.log(event.target.id);
    nav(`/Tvdetail/${id}/${event.target.id}`);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="seasonSelectBox" onClick={open} ref={selectRef1}>
          {season[selectValue].name}
          {click ? <CaretUpFilled /> : <CaretDownFilled />}
        </div>
        <ul
          className={[
            `seasonSelect ${click ? "seasonSelectOpen" : "seasonSelectClose"}`,
          ].join(" ")}
          onChange={select}
          ref={selectRef2}
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
            // <div className="not-seasonImg">
            //   <InfoCircleOutlined />
            // </div>
            <img src={`${img}`} />
          ) : (
            <img src={`${IMG_URL}w500${season[selectValue].poster_path}`} />
          )}
        </div>

        <div className="seasonInfo">
          <div className="seasonName" onClick={goDetail} id={selectValue}>
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
