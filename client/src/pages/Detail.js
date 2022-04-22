import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL, IMG_URL } from "../config";

import MovieHeader from "../components/Header/MovieHeader";
import TitleLargeImg from "../components/TitleLargeImg";

function Detail() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const titleRef = useRef();
  const infoRef = useRef();
  const storyRef = useRef();

  const info = `${API_URL}movie/${id}?api_key=${API_KEY}&language=ko`;
  const actor = `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;
  const reviews = `${API_URL}movie/${id}/reviews?api_key=${API_KEY}`;

  const getMovie = async () => {
    const res = await (await fetch(info)).json();
    setMovie(res);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const lookTitle = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookInfo = () => {
    infoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookStory = () => {
    storyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(movie);
  return (
    <>
      <MovieHeader
        lookInfo={lookInfo}
        lookStory={lookStory}
        lookTitle={lookTitle}
      />
      {loading ? null : (
        <div ref={titleRef}>
          <TitleLargeImg IMG_URL={IMG_URL} {...movie} />
        </div>
      )}
      <hr />
      
    </>
  );
}

export default Detail;
