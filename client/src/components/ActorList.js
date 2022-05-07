import React, { useState } from "react";
import img from "../img/profile_none.PNG";

import "./ActorList.css";

function ActorList({ movieActor, IMG_URL, setModalOpen, setActorId }) {
  const [click, setClick] = useState(false);

  const actor1 = movieActor.slice(0, 8); //페이지 로딩시 보여줄 리스트
  const actor2 = movieActor.slice(9); //더보기 클릭시 보여질 리스트

  const onClick = () => {
    setClick(!click);
  };

  const Actor = ({ data }) => {
    return (
      <>
        {data.map((data) => (
          <ActorOne
            key={data.id}
            data={data}
            IMG_URL={IMG_URL}
            setModalOpen={setModalOpen}
            setActorId={setActorId}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {movieActor.length === 0 ? (
        <p className="notInfo"> 정보가 없습니다. </p>
      ) : (
        <>
          <div className="actor">
            <Actor data={actor1} />
            {click ? <Actor data={actor2} /> : null}
          </div>
          <div className="moreBtn">
            {actor2.length > 0 ? (
              <button onClick={onClick}> {click ? "닫기" : "더보기"}</button>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(ActorList);

export const ActorOne = ({
  data,
  IMG_URL,
  setModalOpen,
  setActorId,
  onModal,
}) => {
  const modal = () => {
    setActorId(data.id);
    setModalOpen(true);
  };
  return (
    <div className="actorOne" key={data.id}>
      <div
        className={[`actorImg ${onModal ? null : "imgHover"}`].join(" ")}
        onClick={onModal ? null : modal}
        style={{
          backgroundImage:
            data.profile_path === null
              ? `url(${img})`
              : `url(${IMG_URL}w200${data.profile_path})`,
        }}
      />
      <div className="actorName">
        <div>{data.name}</div>
        <div>{data.character}</div>

        <span>{data.birthday}</span>
        <span>{data.place_of_birth}</span>
      </div>
    </div>
  );
};
