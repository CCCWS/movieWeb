import React from "react";
import { IMG_URL } from "../config";
import { Carousel } from "antd";
import TitleLargeImg from "./TitleLargeImg";

import "./ImageCarousel.css";

function ImageCarousel({ movieData }) {
  return (
    <>
      <div>
        <Carousel>
          {movieData.map((data) => (
            <div className="mainImgCarousel" key={data.id}>
              <TitleLargeImg
                IMG_URL={IMG_URL}
                {...data}
                main={true}
                rank={movieData.indexOf(data)}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default React.memo(ImageCarousel);
