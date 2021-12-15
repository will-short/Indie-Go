import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

export default function Modal({ setModal }) {
  const [signUp, setSignUp] = useState(false);
  return (
    <div className={style.modalBackground} onClick={() => setModal(false)}>
      {signUp ? (
        <Signup setModal={setModal} />
      ) : (
        <Login setSignUp={setSignUp} setModal={setModal} />
      )}
    </div>
  );
}
