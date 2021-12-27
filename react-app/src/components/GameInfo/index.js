import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gameinfo.module.css";
import Rating from "@mui/material/Rating";
import Carousel from "./carousel";
import ConfirmDelete from "../Modals/confirmdelete";

export default function GameInfo({ game, user }) {
  const session = useSelector((state) => state.session);
  const [modal, setModal] = useState(false);
  if (!game) return null;
  if (game?.price === "None") game.price = null;
  let avgRating = game?.reviews
    ? game.reviews.reduce((acc, { rating }) => acc + +rating, 0) /
      game.reviews.length
    : 0;

  return (
    <div className={style.container}>
      <h2>{game.name}</h2>
      <div className={style.gameInfo}>
        <Carousel game={game} />
        <span className={style.owner}>
          Created by: <strong>{user?.username}</strong>
          {+session?.user?.id === +game.owner_id && (
            <>
              <button
                className="none"
                style={{ color: "red", margin: "0 0 0 auto" }}
                onClick={() => setModal(true)}
              >
                Delete Listing
              </button>
              <Link
                className="none material-icons"
                style={{ color: "white", margin: "0 0 0 10%" }}
                to={`/listings/${game.id}/edit/3`}
              >
                settings
              </Link>
            </>
          )}
        </span>
        <img src={game.image_urls[0]} alt="" />
        <div className={style.info}>
          <p>{game.description}</p>
          <div className={style.rating}>
            <Rating
              name="text-feedback"
              value={avgRating}
              readOnly
              precision={0.5}
              style={{ color: "black" }}
            />
            <span>({game?.reviews?.length || 0})</span>
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
            tags:
            {game?.tags?.map((tag, i) => (
              <span key={i} className={"tags " + tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={style.buttons}>
          <button className="primary-button">Add to cart</button>
          <button className="secondary-button">Add review</button>
        </div>
      </div>
      {modal && <ConfirmDelete setModal={setModal} listingId={game?.id} />}
    </div>
  );
}
