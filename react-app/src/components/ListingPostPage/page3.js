import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import { useState } from "react";
import { useRef } from "react";
import GameInfo from "../GameInfo";
export default function Page3({ data, absPath }) {
  const session = useSelector((state) => state.session);
  let { video, images, name, description } = data;

  let image_urls = images.map((image) => URL.createObjectURL(image));
  let video_url = video && URL.createObjectURL(video);
  let today = new Date();
  let created_at =
    parseInt(today.getMonth() + 1) +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    " ";
  let game = {
    video_url,
    image_urls,
    name,
    description,
    created_at,
  };

  return (
    <div className={style.page3Container}>
      <GameInfo game={game} user={session.user} />
      <button className={`${style.submit} primary-button`}>
        Post game listing!
      </button>
    </div>
  );
}
