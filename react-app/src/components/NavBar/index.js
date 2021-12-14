import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo_words from "../images/capstone-logo-words.svg";
import style from "./navbar.module.css";
import SearchBar from "../SearchBar";
const NavBar = () => {
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
      </div>
    </nav>
  );
};

export default NavBar;
