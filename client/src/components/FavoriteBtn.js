import React, { useEffect, useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

function FavoriteBtn(propData) {
  const [click, setClick] = useState(false);

  const get = JSON.parse(localStorage.getItem("favorite"));

  useEffect(() => {
    if (get !== null && get.length >= 1) {
      const filter =
        propData.title === undefined
          ? get.filter((data) => data.name === propData.name)
          : get.filter((data) => data.title === propData.title);
      if (filter.length === 1) {
        setClick(true);
      }
    }
  }, []);

  const setLocalData = () => {
    const filterGet = get.filter((data) => data.title !== propData.title);
    if (click === false) {
      localStorage.setItem(
        "favorite",
        JSON.stringify([propData, ...filterGet])
      );
    } else {
      localStorage.setItem("favorite", JSON.stringify([...filterGet]));
    }
  };

  const onClick = () => {
    if (click === true) {
      //찜목록에서 제거
      setClick(false);
      setLocalData();
    } else if (click === false) {
      //찜목록에 추가
      setClick(true);
      if (get === null || get.length === 0) {
        localStorage.setItem("favorite", JSON.stringify([propData]));
      } else {
        setLocalData();
      }
    }
  };

  return (
    <div onClick={onClick} className="favorite-btn">
      {click ? (
        <>
          즐겨찾기 <StarFilled />
        </>
      ) : (
        <>
          즐겨찾기 <StarOutlined />
        </>
      )}
    </div>
  );
}

export default FavoriteBtn;
