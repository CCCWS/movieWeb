import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../config";
import { Carousel } from "antd";
import TitleLargeImg from "./TitleLargeImg";

function ImageCarousel({ movieData }) {
  const nav = useNavigate();

  return (
    <>
      <div className="mainImgCarousel">
        <Carousel>
          {movieData.map((data) => (
            <div
              className="mainImgCarousel"
              key={data.id}
              onClick={() => nav(`./detail/${data.id}`)}
            >
              <TitleLargeImg IMG_URL={IMG_URL} {...data} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default ImageCarousel;
