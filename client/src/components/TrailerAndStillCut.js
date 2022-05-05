import React, { useState } from "react";

import Trailer from "./Trailer";
import StillCut from "./StillCut";

function TrailerAndStillCut({
  movieTrailer,
  setTrailerModalOpen,
  setTrailerUrl,
  stillCut,
  setStillCutUrl,
  setStillCutModalOpen,
}) {
  const [click, setClick] = useState(true);

  const clickTrailer = () => {
    setClick(true);
  };

  const clickStillCut = () => {
    setClick(false);
  };

  return (
    <>
      <div>
        <button
          className={[`sectionBtn ${click ? null : "close"}`].join(" ")}
          onClick={clickTrailer}
        >
          예고편
        </button>
        <button
          className={[`sectionBtn ${click ? "close" : null}`].join(" ")}
          onClick={clickStillCut}
        >
          스틸컷 {stillCut.length}
        </button>
      </div>

      {click ? (
        <Trailer
          movieTrailer={movieTrailer}
          setTrailerModalOpen={setTrailerModalOpen}
          setTrailerUrl={setTrailerUrl}
        />
      ) : (
        <StillCut
          stillCut={stillCut}
          setStillCutUrl={setStillCutUrl}
          setStillCutModalOpen={setStillCutModalOpen}
        />
      )}
    </>
  );
}

export default TrailerAndStillCut;
