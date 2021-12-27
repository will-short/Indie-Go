import React, { useEffect, useState } from "react";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import GameInfo from "../GameInfo";
import { postListing, editListing } from "../../store/listings";
import { useListing } from "../../context/ListingContext";

export default function Page3({ absPath, listingId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session);
  const listing = useSelector((state) => state.listings?.[listingId]);
  let {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    setVideo_url,
    setImage_urls,
    image_urls,
    video_url,
    video,
    images,
    tags,
    setTags,
  } = useListing();

  useEffect(() => {
    if (listingId && listing) {
      if (!name) setName(listing.name);
      if (!description) setDescription(listing.description);
      if (!price) setPrice(listing.price);
      if (!video) setVideo_url(listing.video_url);
      if (!image_urls.length) setImage_urls([...listing.image_urls]);
      if (!tags.length) setTags([...listing.tags]);
    }
  }, [listingId]);

  if (!listing?.image_urls?.length) {
    if (!name || !description || images.length < 2)
      return <Redirect to={`${absPath}1`} />;
  }

  if (images.length) {
    if (images[0]) image_urls[0] = URL.createObjectURL(images[0]);
    if (images[1]) image_urls[1] = URL.createObjectURL(images[1]);
    if (images[2]) image_urls[2] = URL.createObjectURL(images[2]);
    if (images[3]) image_urls[3] = URL.createObjectURL(images[3]);
    if (images[4]) image_urls[4] = URL.createObjectURL(images[4]);
  }
  if (video) video_url = URL.createObjectURL(video);
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
    tags,
  };

  function handleSubmit() {
    if (!listing) {
      dispatch(postListing(video, images, name, description, price, tags));
    } else if (
      name !== listing.name ||
      description !== listing.description ||
      JSON.stringify(tags) !== JSON.stringify(listing.tags) ||
      video ||
      images.length
    ) {
      console.log(
        name !== listing.name,
        description !== listing.description,
        tags !== listing.tags,
        video,
        images.length
      );
      images = images.map((el, i) => {
        if (!el && image_urls[i]) {
          return (el = image_urls[i]);
        }
        return el;
      });

      dispatch(
        editListing(video, images, name, description, price, listingId, tags)
      );
    }
    history.push(`/users/${session.user.id}`);
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
