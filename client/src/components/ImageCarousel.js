import React from "react";
import { IMG_URL } from "../config";
import { Carousel } from "antd";
import TitleLargeImg from "./TitleLargeImg";

function ImageCarousel({ movieData }) {
  return (
    <>
      <div className="mainImgCarousel">
        <Carousel>
          {movieData.map((data) => (
            <div className="mainImgCarousel" key={data.id}>
              <TitleLargeImg IMG_URL={IMG_URL} {...data} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default ImageCarousel;
