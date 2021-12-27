import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./searchpage.module.css";
import Rating from "@mui/material/Rating";

export default function GameCard({ game }) {
  if (!game) return null;
  let avgRating = game?.reviews
    ? game.reviews.reduce((acc, { rating }) => acc + +rating, 0) /
      game.reviews.length
    : 0;
  let maxLikes = Math.max.apply(
    Math,
    game.reviews.map((review) => review.likes - review.dislikes)
  );
  let bestReview = game.reviews.find(
    (review) => review.likes - review.dislikes === maxLikes
  );
  return (
    <Link to={`/listings/${game.id}`}>
      <div className={style.gameCard}>
        <img src={game?.image_urls?.[0]} alt="" />
        <h3>{game?.name}</h3>
        <span>Created by:</span>
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
        {bestReview && <p>"{bestReview?.content}"</p>}
      </div>
    </Link>
  );
}
