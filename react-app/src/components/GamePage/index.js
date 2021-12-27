import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gamepage.module.css";
import GameInfo from "../GameInfo";
import Review from "./review";
export default function GamePage() {
  const { listingId } = useParams();
  const listings = useSelector((state) => state.listings);
  const currentGame = listings[listingId];
  return (
    <main className={style.main}>
      <GameInfo game={currentGame} />
      <div className={style.reviewList}>
        {currentGame?.reviews?.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </main>
  );
}
