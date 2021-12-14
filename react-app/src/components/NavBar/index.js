import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo_words from "../images/capstone-logo-words.svg";
import style from "./navbar.module.css";
import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
const NavBar = () => {
  const session = useSelector((state) => state.session);
  const [toggleUserInfo, setToggleUserInfo] = useState(true);
  function userControls() {
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
            <span className="material-icons">account_circle</span>
            <span className="material-icons">arrow_drop_down</span>
          </button>
          <button className={style.cart}>
            <span className="material-icons">shopping_cart</span>
          </button>
        </>
      );
    } else {
      return <button className={style.signIn}>Sign in</button>;
    }
  }
  return (
    <nav>
      <div className={style.content}>
        <NavLink
          to="/"
          exact={true}
          className={`${style.homeLink} ${style.link}`}
        >
          <img src={logo_words} alt="" />
        </NavLink>
        <SearchBar />
        <div className={style.userControls}>{userControls()}</div>
      </div>
    </nav>
  );
};

export default NavBar;
