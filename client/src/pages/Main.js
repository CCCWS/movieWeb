import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMG_URL } from "../config";

import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import MovieCard from "../components/MovieCard";
import ImageCarousel from "../components/ImageCarousel";

function Main() {
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

  const pageCountUp = () => {
    setPageCount((prev) => prev + 1);
  };

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
            {/* <TitleLargeImg {...movie[1]} IMG_URL={IMG_URL} /> */}
            <div>TOP RATED</div>
            <hr />
          </div>

          <div className="movieCard">
            {movie.map((data, index) => (
              <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
            ))}
          </div>

          <div className="readMoreBtn">
            <button onClick={pageCountUp}>더보기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
