import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gameinfo.module.css";
import { useState } from "react";
import { useRef } from "react";

export default function Carousel({ game }) {
  const [carouselPos, setCarouselPos] = useState(0);
  const refArr = useRef([]);
  useEffect(() => {
    if (carouselPos < 0) setCarouselPos(4);
    else if (carouselPos > 4) setCarouselPos(0);

    refArr?.current.forEach((ele, i) => {
      if (i === carouselPos) ele.style.display = "block";
      else ele.style.display = "none";
    });
  }, [carouselPos]);
  let carouselData = [game.video_url, ...game.image_urls.slice(1)];

  if (carouselData.length === 1) return <img src={carouselData[0]} alt="" />;

  function addRef(img) {
    if (img && !refArr?.current?.includes(img)) refArr.current.push(img);
  }

  return (
    <div className={style.carousel}>
      <span
        onClick={() => setCarouselPos(carouselPos - 1)}
        className="material-icons"
      >
        arrow_back_ios
      </span>
      {game.video_url && (
        <video controls width="100%" ref={addRef}>
          <source src={game.video_url} type="video/webm" />
        </video>
      )}
      {carouselData.slice(1).map((image) => (
        <img src={image} alt="" ref={addRef} />
      ))}

      <span
        onClick={() => setCarouselPos(carouselPos + 1)}
        className="material-icons"
      >
        arrow_forward_ios
      </span>
    </div>
  );
}
