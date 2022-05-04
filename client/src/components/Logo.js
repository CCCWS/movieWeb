import React, { useEffect, useState } from "react";
import { IMG_URL } from "../config";

import "./Logo.css";

function Logo({ logoImg }) {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    const fillterEn = logoImg
      .filter((data) => data.iso_639_1 === "en")
      .slice(0, 1);
    const fillterKo = logoImg
      .filter((data) => data.iso_639_1 === "ko")
      .slice(0, 1);

    if (logoImg.length === 1) { //logoImg의 요소가 하나뿐이면 그대로 사용
      setLogo(logoImg);
    } else {
      if (fillterKo.length === 0) {  //ko를 필터링해서 길이가 0이면 en필터
        setLogo(fillterEn);
      } else {
        setLogo(fillterKo);
      }
    }
  }, [logoImg]);

  console.log(logo);

  return (
    <>
      {logo &&
        logo.map((data, index) => (
          <div
            key={index}
            className={
              data.aspect_ratio > 0.8 && data.aspect_ratio < 1.3
                ? "logo1"
                : "logo2"
            }
          >
            <img
              className="logo"
              key={index}
              src={`${IMG_URL}w500${data.file_path}`}
            />
          </div>
        ))}
    </>
  );
}

export default Logo;
