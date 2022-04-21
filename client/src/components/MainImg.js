import React from "react";
import { IMG_URL } from "../config";
import { Carousel } from "antd";

function MainImg({ movieData }) {
  console.log(movieData);
  return (
    <>
      <div className="mainImgCarousel">
        <Carousel>
          {movieData.map((data) => (
            <div key={data.id} className="CarouselMap">
              <img src={`${IMG_URL}original${data.backdrop_path}`} />
              <div className="titleName">
                {data.title} {data.name}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default MainImg;
