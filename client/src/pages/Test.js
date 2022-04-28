import React, { useCallback, useState } from "react";
import "./Test.css";

const array = [
  { id: 1, content: "a" },
  { id: 2, content: "b" },
  { id: 3, content: "c" },
];

function Test() {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div>
      {array.map((array, index) => {
        return (
          <Tag
            key={index}
            id={array.id}
            setCurrentIndex={setCurrentIndex}
            arrayContent={array.content}
            isShow={array.id === currentIndex ? true : false}
          />
        );
      })}
    </div>
  );
}

const Tag = ({ id, arrayContent, isShow, setCurrentIndex }) => {
  const element = useCallback((node) => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        console.log(observer);
        setCurrentIndex(id);
      },
      {
        threshold: 1,
      }
    );

    observer.observe(node);
  }, []);

  return (
    <div className="array">
      <div isShow={isShow} ref={element} className={isShow ? "True" : "False"}>
        {arrayContent}
      </div>
    </div>
  );
};

export default Test;
