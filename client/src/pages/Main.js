import React, { useEffect, useRef } from "react";
import "./Main.css";
import { FullPage, Slide } from "react-full-page";

function Main() {
  const outerDivRef = useRef();

  // useEffect(() => {
  //   const wheelEvent = (event) => {
  //     console.log(event)
  //     event.preventDefault();
  //     const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
  //     const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

  //     // 스크롤 내릴 때
  //     if (event.deltaY > 0) {
  //       if (scrollTop >= 0 && scrollTop < pageHeight) {
  //         outerDivRef.current.scrollTo({
  //           top: pageHeight,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
  //         outerDivRef.current.scrollTo({
  //           top: pageHeight * 2,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       } else {
  //         outerDivRef.current.scrollTo({
  //           top: pageHeight * 2,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       }

  //       // 스크롤 올릴 때
  //     } else {
  //       if (scrollTop >= 0 && scrollTop < pageHeight) {
  //         outerDivRef.current.scrollTo({
  //           top: 0,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
  //         outerDivRef.current.scrollTo({
  //           top: 0,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       } else {
  //         outerDivRef.current.scrollTo({
  //           top: pageHeight,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   };
  //   const outerDivRefCurrent = outerDivRef.current;
  //   outerDivRefCurrent.addEventListener("wheel", wheelEvent);
  //   return () => {
  //     outerDivRefCurrent.removeEventListener("wheel", wheelEvent);
  //   };
  // }, []);
  return (
    // <div ref={outerDivRef} className="outer">
    //   <div className="inner bg-yellow">1</div>
    //   <div className="inner bg-blue">2</div>
    //   <div className="inner bg-pink">3</div>
    // </div>
    <FullPage controls>
      <Slide>
        <div>test</div>
      </Slide>
      <Slide>
        <div>test</div>
      </Slide>
      <Slide>
        <div>test</div>
      </Slide>
    </FullPage>
  );
}

export default Main;
