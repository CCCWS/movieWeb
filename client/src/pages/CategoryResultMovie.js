import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import MovieCard from "../components/MovieCard";

import { IoMdArrowRoundBack } from "react-icons/io";
import "./CategoryResult.css";

function CategoryResultMovie() {
  const nav = useNavigate();
  const { id } = useParams();
  const { value } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApi = async () => {
    const url = `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=1&with_genres=${id}`;
    const res = await (await fetch(url)).json();
    setMovie(res.results);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
  }, []);

  const goBack = () => {
    nav(-1);
  };
  console.log(value);
  return (
    <>
      <div className="goBack" onClick={goBack}>
        <IoMdArrowRoundBack /> {value}
      </div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div
          className="movieCard category-result"
          // data-aos="fade-up"
          // data-aos-duration="1000"
          // data-aos-once="true"
        >
          {movie.map((data, index) => (
            <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
          ))}
        </div>
      )}
    </>
  );
}

export default CategoryResultMovie;
