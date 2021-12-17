import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function ListingPostPage() {
  let { id } = useParams();
  let url = useLocation();
  const absPath = url.pathname.split("new")[0] + "new/";
  return (
    <main className={style.main}>
      <header className={style.header}>
        <NavLink
          to={absPath + "1"}
          className={style.first}
          activeClassName={style.active}
        >
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Name/Description</span>
        </NavLink>
        <span id="1"></span>
        <NavLink
          to={absPath + "2"}
          className={style.second}
          activeClassName={style.active}
        >
          <span></span>
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Media</span>
        </NavLink>
        <span id="2"></span>
        <NavLink
          to={absPath + "3"}
          className={style.third}
          activeClassName={style.active}
        >
          <span></span>
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Preview</span>
        </NavLink>
      </header>
    </main>
  );
}
