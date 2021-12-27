import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./searchpage.module.css";

export default function HomePage() {
  const listings = useSelector((state) => state.listings);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");
  const search = query.get("search");
  if (!listings) return null;
  let searchListings = [];
  if (type === "tags") {
    searchListings = Object.values(listings).filter((listing) =>
      listing?.tags?.includes(search)
    );
  }
  console.log(searchListings);

  return (
    <main className={style.main}>
      <aside></aside>
      <div></div>
    </main>
  );
}
