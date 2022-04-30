import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AOS from "aos";
import "aos/dist/aos.css";

import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieHeader from "../components/Header/MovieHeader";
import TitleLargeImg from "../components/TitleLargeImg";
import ActorList from "../components/ActorList";
import Trailer from "../components/Trailer";
import Story from "../components/Story";
import MovieDetail from "../components/MovieDetail";
import ProductionLogo from "../components/ProductionLogo";

import "./Detail.css";

import Modal from "../components/Modal";

function Detail() {
  const [movieInfo, setMovieInfo] = useState([]); //영화 정보 저장
  const [companies, setcompanies] = useState([]); //영화 제작사 저장
  const [movieActor, setMovieActor] = useState([]); //출연 배우
  const [genres, setGenres] = useState([]); //장르
  const [loading, setLoading] = useState(true); //로딩 여부
  const [movieTrailer, setMovieTrailer] = useState([]); //트레일러 영상

  const { id } = useParams();

  // const titleRef = useRef();
  // const infoRef = useRef();
  // const storyRef = useRef();
  // const trailerRef = useRef();

  const info = `${API_URL}movie/${id}?api_key=${API_KEY}&language=ko`; //영화 정보
  const actor = `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=ko`; //영화 출연 배우
  const reviews = `${API_URL}movie/${id}/reviews?api_key=${API_KEY}`; //영화 리뷰
  const test1 = `${API_URL}person/${"배우id"}?api_key=${API_KEY}`; //배우 상세정보
  const test2 = `${API_URL}person/${"배우id"}/credits?api_key=${API_KEY}`; //배우 출연작
  const test3 = `${API_URL}movie/${id}/similar?api_key=${API_KEY}`; //비슷한 영화?
  const trailer = `${API_URL}movie/${id}/videos?api_key=${API_KEY}`; //트레일러 유튜브

  useEffect(() => {
    getApi();
  }, [id]);

  const getApi = async () => {
    setLoading(true);
    const getInfo = await (await fetch(info)).json();
    const getActor = await (await fetch(actor)).json();
    const getTrailer = await (await fetch(trailer)).json();

    setMovieInfo(getInfo);
    setcompanies(getInfo.production_companies);
    setGenres(getInfo.genres);
    setMovieActor(getActor.cast.slice(0, 40));
    setMovieTrailer(getTrailer.results);

    setLoading(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);
  // const lookInfo = () => {
  //   infoRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // const lookStory = () => {
  //   storyRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // const lookTrailer = () => {
  //   trailerRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  const [modalOpen, setModalOpen] = useState(false);
  const [actorId, setActorId] = useState();

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className="detailPage">
      <MovieHeader />
      {loading ? (
        <Space className="loadingImg">
          <LoadingOutlined />
        </Space>
      ) : (
        <>
          <Modal
            closeModal={closeModal}
            modalOpen={modalOpen}
            actorId={actorId}
            API_URL={API_URL}
            API_KEY={API_KEY}
            IMG_URL={IMG_URL}
          />

          <div>
            <TitleLargeImg
              IMG_URL={IMG_URL}
              backdrop_path={movieInfo.backdrop_path}
              DetailPage={true}
            />
          </div>

          <div
            id="2"
            className="movieInfo"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <MovieDetail {...movieInfo} IMG_URL={IMG_URL} genres={genres} />
            <hr />
            <div
              id="3"
              className="movieStory"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              <div className="section">줄거리</div>
              <Story
                overview={movieInfo.overview}
                tagline={movieInfo.tagline}
              />
            </div>
            <hr />
            <div
              id="4"
              className="trailer"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              <div className="section">예고편</div>
              <Trailer movieTrailer={movieTrailer} />
            </div>

            <hr />

            <div
              id="5"
              className="actorBox"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              <div className="section">출연</div>
              <ActorList
                movieActor={movieActor}
                IMG_URL={IMG_URL}
                openModal={openModal}
                setActorId={setActorId}
              />
            </div>
          </div>
          <hr />
          <div className="productionLogo">
            <ProductionLogo companies={companies} IMG_URL={IMG_URL} />
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
