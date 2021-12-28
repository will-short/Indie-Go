import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gamepage.module.css";
import GameInfo from "../GameInfo";
import Rating from "@mui/material/Rating";
export default function Review({ review }) {
  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewLeft}>
        <Rating
          name="text-feedback"
          value={review?.rating}
          readOnly
          precision={0.5}
          style={{ color: "black" }}
        />
        <p>"{review.content}"</p>
        <div className={style.likesContainer}>
          <span>
            <i className="material-icons-outlined">thumb_up</i>{" "}
            {review?.likes || 0}
          </span>
          <span>
            <i class="material-icons-outlined">thumb_down</i>{" "}
            {review?.dislikes || 0}
          </span>
        </div>
      </div>
      <div className={style.reviewRight}>
        <img src={review?.owner?.image_url} alt="" />
        <span>{review?.owner?.username}</span>
      </div>
    </div>
  );
}
