import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import { API_URL, API_KEY, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import ImageCarousel from "../components/ImageCarousel";

import AOS from "aos";
import "aos/dist/aos.css";

function TvMain() {
  const [readMore, setReadMore] = useInView(); //ref로 지정한 태그를 만나면 true반환

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);

  const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=${pageCount}`;
  // const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=${pageCount}`;

  const getMovie = async () => {
    const res = await (await fetch(url)).json();
    setMovie([...movie, ...res.results]); //페이지 카운터가 증가했을때 기존 데이터에 추가 데이터를 합침
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
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="MainPage">
          <div>
            <ImageCarousel movieData={movie.slice(0, 5)} tv={true} />
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

export default TvMain;
