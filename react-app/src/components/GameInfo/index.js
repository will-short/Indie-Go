import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gameinfo.module.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function GameInfo({ game, user }) {
  const [carouselPos, setCarouselPos] = useState(0);
  useEffect(() => {
    if (carouselPos < 0) setCarouselPos(4);
    else if (carouselPos > 4) setCarouselPos(0);
    console.log(carouselPos);
  }, [carouselPos]);
  if (!game) return null;
  let carouselData = [game.video_url, ...game.image_urls.slice(1)];
  return (
    <div className={style.container}>
      <h2>{game.name}</h2>
      <div className={style.gameInfo}>
        <div className={style.carousel}>
          <span
            onClick={() => setCarouselPos(carouselPos - 1)}
            class="material-icons"
          >
            arrow_back_ios
          </span>
          {carouselPos === 0 ? (
            <video controls width="100%">
              <source src={game.video_url} type="video/webm" />
            </video>
          ) : (
            <img src={carouselData[carouselPos]} alt="" />
          )}
          <span
            onClick={() => setCarouselPos(carouselPos + 1)}
            class="material-icons"
          >
            arrow_forward_ios
          </span>
        </div>
        <span className={style.owner}>
          Created by: <strong>{user.username}</strong>
        </span>
        <img src={game.image_urls[0]} alt="" />
        <p>{game.description}</p>
        <div className={style.rating}>
          <Rating
            name="text-feedback"
            value={4}
            readOnly
            precision={0.5}
            style={{ color: "black" }}
          />
          <span>(10000)</span>
        </div>
        <div className={style.release}>
          <span>RELEASE DATE:</span>
          <span style={{ color: "white" }}>
            {game.created_at.split(" ")[0]}
          </span>
        </div>
        <div className={style.tags}>
          <span>tags:</span>
        </div>
        <div className={style.buttons}>
          <button className="primary-button">Add to cart</button>
          <button className="secondary-button">Add review</button>
        </div>
      </div>
    </div>
  );
}
