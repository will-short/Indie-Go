import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { addReview } from "../../store/listings";

export default function Modal({ setModal, listingId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  function handleSubmit() {
    dispatch(addReview({ rating, content, listing_id: listingId })).then(() =>
      setModal(false)
    );
  }
  return (
    <div className={style.modalBackground} onClick={() => setModal(false)}>
      <div className={style.reviewPost} onClick={(e) => e.stopPropagation()}>
        <h1>Review</h1>
        <span>
          Rating:
          <Rating
            name="text-feedback"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            precision={0.5}
            size="large"
            style={{ color: "silver", marginLeft: "1ch" }}
          />
        </span>
        <div className={style.textWrapper}>
          <textarea
            name=""
            className={style.reviewContent}
            onChange={(e) => setContent(e.target.value)}
          />
          <p
            style={{
              color:
                content.length < 1 || content.length > 200 ? "red" : "white",
            }}
          >{`${content.length}/200`}</p>
        </div>
        <button
          className={
            content.length < 1 || content.length > 200
              ? "primary-button disabled"
              : `primary-button`
          }
          onClick={handleSubmit}
        >
          Post Review
        </button>
      </div>
    </div>
  );
}
