import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const [localData, setLocalData] = useState();

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("favorite")));
  }, []);

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={style}>
      {localData && (
        <>
          <MovieCard data={localData} />
        </>
      )}
    </div>
  );
}

export default Favorite;
