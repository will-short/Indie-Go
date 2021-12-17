import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function ListingPostPage() {
  return (
    <main className={style.main}>
      <header className={style.header}>
        <div></div>
        <span></span>
        <div></div>
        <span></span>
        <div></div>
      </header>
    </main>
  );
}
