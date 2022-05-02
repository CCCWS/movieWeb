import React from "react";
import { IMG_URL } from "../config";

import "./Logo.css";

function Logo({ logoImg }) {
  const filterLogo = logoImg
    .filter((data) => data.iso_639_1 === "en")
    .slice(0, 1);

  const logo = logoImg.length > 1 ? filterLogo : logoImg;

  return (
    <>
      {logo.map((data, index) => (
        <div
          key={index}
          className={
            data.aspect_ratio > 0.8 && data.aspect_ratio < 1.2
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
