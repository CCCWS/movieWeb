import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import "./SelectBox.css";

function SelectBox({
  data,
  setSelectValue,
  selectValue,
  AdvancedSearch,
  setSortBy,
}) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [click, setClick] = useState(false);

  const open = () => {
    setClick(!click);
  };

  const select = (event) => {
    setSelectValue(event.target.value);
    if (AdvancedSearch === true) {
      setSortBy(event.target.id);
    }
    setClick(!click);
  };

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
    <div
      className={[
        `seasonSelectBox ${AdvancedSearch === true ? "width200" : "width400"}`,
      ].join(" ")}
      onClick={open}
      ref={selectRef1}
    >
      {data[selectValue].name}
      <div className="caret-filled"> {click ? <CaretUpFilled /> : <CaretDownFilled />} </div>
      <ul
        className={[
          `seasonSelect ${click ? "seasonSelectOpen" : "seasonSelectClose"}`,
        ].join(" ")}
        onChange={select}
        ref={selectRef2}
      >
        {data.map((item, index) => (
          <li
            onClick={select}
            key={index}
            value={data.indexOf(item)}
            id={AdvancedSearch === true ? item.sort : null}
            className="seasonSelectValue"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(SelectBox);
