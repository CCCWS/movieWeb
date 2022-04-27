import React, { useEffect, useState, useRef } from "react";

import { useInView } from "react-intersection-observer";

import { API_URL, API_KEY, IMG_URL } from "../config";

import { Space } from "antd";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import MovieCard from "../components/MovieCard";
import ImageCarousel from "../components/ImageCarousel";

import AOS from "aos";
import "aos/dist/aos.css";

function Main() {
  const [readMore, setReadMore] = useInView();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);

  const url = `${API_URL}discover/movie?api_key=${API_KEY}&year=2022&sort_by=popularity.desc&language=ko&page=${pageCount}`;
  const getMovie = async () => {
    const res = await (await fetch(url)).json();
    setMovie([...movie, ...res.results]);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [pageCount]);

  useEffect(() => {
    if (setReadMore === true) {
      setPageCount((prev) => prev + 1);
    }
  }, [setReadMore]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {loading ? (
        <Space className="loadingImg">
          <LoadingOutlined />
        </Space>
      ) : (
        <div className="MainPage">
          <div className="MainImg">
            <ImageCarousel movieData={movie.slice(0, 5)} />
          </div>

          <div>
            <div>TOP RATED</div>
            <hr />
          </div>

          <div
            className="movieCard"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            {movie.map((data, index) => (
              <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
            ))}
          </div>

          <div className="showScroll">
            <div>스크롤해서 더보기</div>
            <DoubleRightOutlined rotate={90} />
          </div>

          <div ref={readMore}>.</div>
        </div>
      )}
    </>
  );
}

export default Main;
