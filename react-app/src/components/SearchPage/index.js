import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./searchpage.module.css";
import GameCard from "./gameCard";

export default function HomePage() {
  const listings = useSelector((state) => state.listings);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tags = query.get("tags");
  const name = query.get("name");
  if (!listings) return null;
  let searchListings = [];
  if (tags) {
    searchListings = Object.values(listings).filter((listing) =>
      listing?.tags?.includes(tags)
    );
  }
  if (name) {
    searchListings = Object.values(listings).filter((listing) =>
      listing?.name.toLowerCase().includes(name)
    );
  }
  console.log(name);

  return (
    <main className={style.main}>
      <aside>
        <div className={style.byPrice}>
          <h4>Narrow by price</h4>
        </div>
        <div className={style.byPref}>
          <h4>Narrow by preference</h4>
        </div>
        <div className={style.byTags}>
          <h4>Narrow by tags</h4>
        </div>
      </aside>
      <div className={style.gameList}>
        {searchListings?.map((listing) => (
          <GameCard game={listing} />
        ))}
      </div>
    </main>
  );
}
