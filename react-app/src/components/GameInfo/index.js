import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gameinfo.module.css";
import Rating from "@mui/material/Rating";
import Carousel from "./carousel";
export default function GameInfo({ game, user }) {
  const session = useSelector((state) => state.session);
  if (!game) return null;
  if (game?.price === "None") game.price = null;
  return (
    <div className={style.container}>
      <h2>{game.name}</h2>
      <div className={style.gameInfo}>
        <Carousel game={game} />
        <span className={style.owner}>
          Created by: <strong>{user.username}</strong>
          {+session.user.id === +game.owner_id && (
            <button style={{ color: "red", margin: "0 0 0 40%" }}>
              Delete Listing
            </button>
          )}
        </span>
        <img src={game.image_urls[0]} alt="" />
        <div className={style.info}>
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
          <div className={style.price}>
            PRICE:
            <span style={{ color: "white" }}>
              {game?.price ? `$${game?.price}` : "Free"}
            </span>
          </div>
          <div className={style.tags}>
            <span>tags:</span>
          </div>
        </div>
        <div className={style.buttons}>
          <button className="primary-button">Add to cart</button>
          <button className="secondary-button">Add review</button>
        </div>
      </div>
    </div>
  );
}
