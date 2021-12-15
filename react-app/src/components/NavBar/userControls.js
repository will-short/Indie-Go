import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./navbar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import UserDropdown from "./userDropdown";
export default function UserControls({ setModal }) {
  const [toggleUserInfo, setToggleUserInfo] = useState(true);
  const session = useSelector((state) => state.session);
  if (session?.user) {
    return (
      <>
        <Switch>
          <Route path="/favorites">
            <Link
              to="/"
              className="material-icons"
              style={{
                color: "#8a2be2",
                width: "24px",
              }}
            >
              favorite
            </Link>
          </Route>
          <Route path="/">
            <Link
              to="/favorites"
              className="material-icons"
              style={{
                color: "white",
                width: "24px",
              }}
            >
              favorite_outlined
            </Link>
          </Route>
        </Switch>

        <button
          className={style.user}
          onClick={() => setToggleUserInfo(!toggleUserInfo)}
        >
          <img src={session?.user.image_url} alt="" />
          <span className="material-icons">arrow_drop_down</span>
          {toggleUserInfo && <UserDropdown />}
        </button>
        <button className={style.cart}>
          <span className="material-icons">shopping_cart</span>
        </button>
      </>
    );
  } else {
    return (
      <button className={style.signIn} onClick={() => setModal(true)}>
        Sign in
      </button>
    );
  }
}
