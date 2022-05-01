import React from "react";
import { IMG_URL } from "../config";

import "./Logo.css";

function Logo({ logoImg }) {
  const logofilter = logoImg
    .filter((data) => data.iso_639_1 === "en")
    .slice(0, 1);

  return (
    <>
      {logofilter.map((data, index) => (
        <img
          className="logo"
          key={index}
          src={`${IMG_URL}w500${data.file_path}`}
        />
      ))}
    </>
  );
}

export default Logo;
