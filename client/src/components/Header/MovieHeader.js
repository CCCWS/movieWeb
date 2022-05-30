import React from "react";
import "./MovieHeader.css";
import { Link } from "react-scroll";

function MovieHeader() {
  const top = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="movieHeader">
      <button onClick={top}>맨위로</button>

      <Link to="2" spy={true} smooth={true}>
        <button>정보</button>
      </Link>

      <Link to="3" spy={true} smooth={true}>
        <button>줄거리</button>
      </Link>

      <Link to="4" spy={true} smooth={true}>
        <button>예고편 / 스틸컷</button>
      </Link>

      <Link to="5" spy={true} smooth={true}>
        <button>출연</button>
      </Link>

      <Link to="6" spy={true} smooth={true}>
        <button>리뷰</button>
      </Link>
    </div>
  );
}

export default React.memo(MovieHeader);
