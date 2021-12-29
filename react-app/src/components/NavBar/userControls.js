import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./navbar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import UserDropdown from "./userDropdown";
import dropDownStyle from "./dropDownStyle.module.css";
import { useEffect } from "react";

export default function UserControls({ setModal, setCart, cart }) {
  const [toggleUserInfo, setToggleUserInfo] = useState(false);
  const session = useSelector((state) => state.session);

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setToggleUserInfo(false);
    }
  }

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
          onBlur={handleBlur}
        >
          <img src={session?.user.image_url} alt="" />
          <span className="material-icons">arrow_drop_down</span>
          {toggleUserInfo && (
            <UserDropdown
              toggleUserInfo={toggleUserInfo}
              setToggleUserInfo={setToggleUserInfo}
            />
          )}
        </button>
        <button
          className={style.cart}
          onClick={() => {
            console.log(cart);
            setCart(!cart);
          }}
        >
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
