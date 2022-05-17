import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import { API_URL, API_KEY, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import ImageCarousel from "../components/ImageCarousel";
import SelectYear from "../components/SelectYear";

import AOS from "aos";
import "aos/dist/aos.css";

function TvMain() {
  const [readMore, setReadMore] = useInView(); //ref로 지정한 태그를 만나면 true반환

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [year, setYear] = useState(2022);

  const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=${pageCount}&first_air_date_year=${year}`;
  // const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=${pageCount}`;

  const getMovie = async () => {
    const res = await (await fetch(url)).json();
    setMovie([...movie, ...res.results]); //페이지 카운터가 증가했을때 기존 데이터에 추가 데이터를 합침
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [pageCount, year]);

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
            <div>{year} Popular</div>
            <hr />
          </div>

          <div className="popular-main">
            <SelectYear
              year={year}
              setYear={setYear}
              setMovie={setMovie}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
            <div
              className="movieCard"
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-once="true"
            >
              {movie.map((data, index) => (
                <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
              ))}
            </div>
          </div>

          <div className="showScroll">
            <DoubleRightOutlined rotate={90} />
            <div ref={readMore}></div>
          </div>
        </div>
      )}
    </>
  );
}

export default TvMain;
