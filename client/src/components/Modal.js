import React, { useEffect, useState } from "react";

import { ActorOne } from "./ActorList";
import MovieCard from "./MovieCard";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";

import "./Modal.css";

import img from "../img/profile_none.PNG";

function Modal({
  setModalOpen,
  modalOpen,
  actorId,
  API_URL,
  API_KEY,
  IMG_URL,
}) {
  const body = document.querySelector("body");
  const [actorDetail, setActorDetail] = useState();
  const [actorMovie, setActorMovie] = useState();
  const [actorTv, setActorTv] = useState();
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(true);

  const getApi = async () => {
    const actor = `${API_URL}person/${actorId}?api_key=${API_KEY}`; //배우 상세정보
    const movie = `${API_URL}person/${actorId}/movie_credits?api_key=${API_KEY}&language=ko`; //배우 출연작
    const tv = `${API_URL}person/${actorId}/tv_credits?api_key=${API_KEY}&language=ko`; //배우 출연작

    setLoading(true);

    const getActor = await (await fetch(actor)).json();
    const getMovie = await (await fetch(movie)).json();
    const getTv = await (await fetch(tv)).json();

    const filterTv = getTv.cast.filter((data) => data.first_air_date !== "");
    const sortTv = filterTv.sort(function (a, b) {
      return (
        new Date(b.first_air_date).getTime() -
        new Date(a.first_air_date).getTime()
      );
    });

    const filterMovie = getMovie.cast.filter(
      (data) => data.release_date !== ""
    );
    const sortMovie = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    setActorDetail(getActor);
    setActorMovie(sortMovie);
    setActorTv(sortTv);

    setLoading(false);
  };

  useEffect(() => {
    if (modalOpen) {
      body.classList.toggle("not-scroll");
      getApi();
    } else {
      body.classList.remove("not-scroll");
    }
    return () => {
      //뒤로가기 등으로 인하여 화면을 벗어나면 스크롤 활성화
      return body.classList.remove("not-scroll");
    };
  }, [modalOpen, setModalOpen]);

  const modalClose = (event) => {
    if (event.target.parentNode.className === "detailPage") {
      setModalOpen(false);
      body.classList.toggle("not-scroll");
    }
  };

  const modalCloseBtn = () => {
    setModalOpen(false);
    body.classList.toggle("not-scroll");
  };

  // window.onbeforeunload = function () {
  //   return body.classList.remove("not-scroll");
  // };

  const clickMovie = () => {
    setClick(true);
  };

  const clickTv = () => {
    setClick(false);
  };

  return (
    <div
      className={[`modal ${modalOpen ? "modal_open" : null}`].join(" ")}
      onClick={modalClose}
    >
      {modalOpen && (
        <>
          <button onClick={modalCloseBtn} className="modalCloseBtn">
            <CloseOutlined />
          </button>
          <div className="item">
            {loading ? (
              <div className="loading">
                <LoadingOutlined />
              </div>
            ) : (
              <>
                <ActorOne
                  data={actorDetail}
                  IMG_URL={IMG_URL}
                  img={img}
                  onModal={true}
                />

                <div>
                  <button
                    className={[
                      `modalSectionBtn ${click ? null : "close"}`,
                    ].join()}
                    onClick={clickMovie}
                  >
                    영화 {actorMovie.length}
                  </button>
                  <button
                    className={[
                      `modalSectionBtn ${click ? "close" : null}`,
                    ].join()}
                    onClick={clickTv}
                  >
                    TV {actorTv.length}
                  </button>
                </div>

                {click ? (
                  <>
                    <MovieCard
                      data={actorMovie}
                      onModal={true}
                      setModalOpen={setModalOpen}
                    />
                  </>
                ) : (
                  <>
                    <MovieCard
                      data={actorTv}
                      onModal={true}
                      setModalOpen={setModalOpen}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Modal);
