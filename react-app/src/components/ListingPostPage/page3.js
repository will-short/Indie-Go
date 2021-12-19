import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import GameInfo from "../GameInfo";
import { postListing } from "../../store/listings";

export default function Page3({ data, absPath }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  let { video, images, name, description, price } = data;
  console.log({ data });
  if (data && (!name || !description || images.length < 2))
    return <Redirect to={`${absPath}1`} />;

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
    price,
  };

  function handleSubmit() {
    dispatch(postListing(video, images, name, description));
  }
  return (
    <div className={style.page3Container}>
      <GameInfo game={game} user={session.user} />
      <button
        onClick={handleSubmit}
        className={`${style.submit} primary-button`}
      >
        Post game listing!
      </button>
    </div>
  );
}
