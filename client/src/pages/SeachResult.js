import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined } from "@ant-design/icons";

function SeachResult() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);

  const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${id}`;
  const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${id}`;
  const getApi = async () => {
    setLoading(true);
    const getSearchMovie = await (await fetch(MovieUrl)).json();
    const getSearchTv = await (await fetch(TvUrl)).json();

    const filterMovie = getSearchMovie.results.filter(
      (data) => data.release_date !== ""
    );

    const filterTv = getSearchTv.results.filter(
      (data) => data.release_date !== ""
    );

    const sortTv = filterTv.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    const sortMovie = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    setTv(sortTv);
    setMovie(sortMovie);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
  }, [id]);

  const notFound = {
    minWidth: "100%",
    minHeight: "100%",
    display: "flex",
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          {movie.length > 0 || tv.length > 0 ? (
            <div>
              <div>영화</div>
              <div className="movieCard ">
                {movie.map((data, index) => (
                  <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                ))}
              </div>

              <div>
                <div>TV</div>
                <div className="movieCard ">
                  {tv.map((data, index) => (
                    <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={notFound}>검색 결과가 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
}

export default SeachResult;
