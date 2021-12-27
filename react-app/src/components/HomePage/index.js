import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./homepage.module.css";

export default function HomePage() {
  const session = useSelector((state) => state.session);
  const listings = useSelector((state) => state.listings);
  const [tagsI1, setTagsI1] = useState(0);
  const [tagsI2, setTagsI2] = useState(3);
  const [tagsI3, setTagsI3] = useState(6);

  let tagsList = [
    "action",
    "adventure",
    "rpg",
    "mmo",
    "casual",
    "sports",
    "simulation",
    "strategy",
    "racing",
    "horror",
  ];

  useEffect(() => {
    let position = 1;
    const interval = setInterval(() => {
      position++;
      if (position > 3) position = 1;
      let max = 0;
      let min = 0;
      let tagPos = 0;
      if (position === 1) {
        min = 0;
        max = 3;
        tagPos = Math.floor(Math.random() * (max - min + 1) + min);
      } else if (position === 2) {
        min = 4;
        max = 6;
        tagPos = Math.floor(Math.random() * (max - min + 1) + min);
      } else {
        min = 7;
        max = 9;
        tagPos = Math.floor(Math.random() * (max - min + 1) + min);
      }
      eval(`setTagsI${position}(${tagPos})`);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!listings) return null;

  function gamePannel(tag) {
    let gamesList = Object.values(listings).filter((listing) =>
      listing?.tags.includes(tag)
    );

    return (
      <Link to={`listings?tags=${tag}`}>
        <div className={style.content}>
          <img src={gamesList?.[0]?.image_urls?.[0]} alt="" />
          <h2>{`Top ${tag} games`}</h2>
        </div>
      </Link>
    );
  }

  return (
    <main className={style.main}>
      <header>
        <a href="https://github.com/will-short/Indie-Go" target="_blank">
          <i className="fab fa-github fa-2x"></i>
        </a>
        <div>
          <h1>
            {session?.user
              ? `Welcome to Indie-Go, ${session.user.username}`
              : `Welcome to Indie-Go`}
          </h1>
          {!session?.user && (
            <p>
              Try signing in as Demo to experience this app as a user without
              creating an account and Checkout the github link to learn more
              about this app!
            </p>
          )}
        </div>
        <a href="https://www.linkedin.com/in/will-short/" target="_blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </header>
      <div className={style.lower}>
        <h1>Find your next favorite game!</h1>
        {gamePannel(tagsList[tagsI1])}
        {gamePannel(tagsList[tagsI2])}
        {gamePannel(tagsList[tagsI3])}
      </div>
    </main>
  );
}
