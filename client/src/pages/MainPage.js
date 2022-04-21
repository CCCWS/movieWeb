import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMG_URL } from "../config";

import MainImg from "../components/MainImg";

function MainPage() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${API_URL}trending/all/week?api_key=${API_KEY}&language=ko&page=1`;

    const getMovie = async () => {
      const res = await (await fetch(url)).json();
      setMovie(res.results);
      setLoading(false);
    };

    getMovie();
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((res) => setMovie(res.results));
  }, []);
  console.log(movie);
  return (
    <>
      {loading ? null : (
        <div className="MainPage">
          <div className="MainImg">
            <MainImg movieData={movie.slice(0, 5)} />
          </div>

          <div>
            <div>TOP RATED</div>
            <hr />
          </div>

          <div className="movieCard">
            {movie.map((data, index) => (
              <div key={index}>
                <img src={`${IMG_URL}w200${data.poster_path}`} />
                <div>
                  {data.title}
                  {data.name}
                </div>
              </div>
            ))}
          </div>

          <div className="readMoreBtn">
            <button>더보기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
