import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const [localData, setLocalData] = useState();

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("favorite")));
  }, []);

  return (
    <>
      {localData && (
        <div className="movieCard">
          {localData.map((data, index) => (
            <MovieCard key={index} {...data} />
          ))}
        </div>
      )}
    </>
  );
}

export default Favorite;
