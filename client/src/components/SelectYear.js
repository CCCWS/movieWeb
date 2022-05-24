import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import "./SelectYear.css";

function SelectYear({ year, setYear, setMovie, setPageCount, setLoading }) {
  const [click, setClick] = useState(false);

  const yearList = [];
  for (let i = 2022; i >= 1990; i--) yearList.push(i);

  const selectYear = (event) => {
    if (year !== event.target.innerText) {
      setYear(event.target.innerText);
      setMovie([]);
      setPageCount(1);
      setLoading(true);
      setClick(false);
    }
  };

  //   const select = (event) => {
  //     setYear(event.target.innerText);
  //     setClick(false);
  //   };

  const open = () => {
    setClick(true);
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

  return (
    <>
      <div className="popular-year">
        {yearList.map((data, index) => (
          <div
            key={index}
            onClick={selectYear}
            // style={{ backgroundColor: data === year ? "blue" : "red" }}
            className={parseInt(data) === parseInt(year) ? "click-year" : null}
          >
            {data}
          </div>
        ))}
      </div>

      <div className="popular-year-width800">
        <div className="year-select-box" onClick={open} ref={selectRef1}>
          {year}
          {click ? <CaretUpFilled /> : <CaretDownFilled />}
        </div>
        <ul
          className={[
            `year-select ${click ? "year-select-open" : "year-select-close"}`,
          ].join(" ")}
          onChange={selectYear}
          ref={selectRef2}
        >
          {yearList.map((data, index) => (
            <li
              onClick={selectYear}
              key={index}
              value={data}
              className="year-select-value"
            >
              {data}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SelectYear;
