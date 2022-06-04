import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("favorite")));
  }, []);

  console.log(localData === null);

  const clearRecent = () => {
    if (localData !== null) {
      setLocalData([]);
      localStorage.removeItem("favorite");
    }
  };

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div className="Category-page">
      <div className="Category-box">
        <div className="recent-view-box">
          <div className="recent-view-title">
            <div>즐겨찾기</div>
            <button onClick={clearRecent}>전체 삭제</button>
          </div>

          {localData === null && <div>추가된 목록이 없습니다.</div>}

          {localData && (
            <>
              <MovieCard data={localData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
