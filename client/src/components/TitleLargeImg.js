import React from "react";

import "./TitleLargeImg.css";

function TitleLargeImg({ IMG_URL, backdrop_path, DetailPage, title, name }) {
  const checkNull = backdrop_path ? `${IMG_URL}original${backdrop_path}` : null;

  const styleDetail = {
    backgroundImage: `linear-gradient(to bottom,
      rgba(31,31,31,0.3)50%,
      rgba(31,31,31,0.6)70%,
      rgba(31,31,31,1)100%), 
  
      linear-gradient(to top,
        rgba(31,31,31,0.3)50%,
        rgba(31,31,31,0.6)70%,
        rgba(31,31,31,1)100%),
      url('${checkNull}')`,
  };

  const styleMain = {
    backgroundImage: `linear-gradient(to bottom,
      rgba(31,31,31,0)60%,
      rgba(31,31,31,0.3)80%,
      rgba(31,31,31,1)100%), 

      linear-gradient(to top,
        rgba(31,31,31,0)60%,
        rgba(31,31,31,0.3)80%,
        rgba(31,31,31,1)100%),  
      url('${checkNull}')`,
  };

  const style = DetailPage === true ? styleDetail : styleMain;
  const where = DetailPage === true ? "fromDetail" : "fromMain";

  return (
    <div className={[`titleLargeImg`, where].join(" ")} style={style}>
      {DetailPage ? null : (
        <div className="titleName">
          <div>
            {title} {name}
          </div>
          <div>실시간 인기 영화 7위</div>
        </div>
      )}
    </div>
  );
}

export default React.memo(TitleLargeImg);
