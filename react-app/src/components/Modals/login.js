import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import logo_words from "../images/capstone-logo-words.svg";
import { login } from "../../store/session";

export default function Login({ setSignUp, setModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log(data);
    setModal(false);
  };

  return (
    <div className={style.modalLogin} onClick={(e) => e.stopPropagation()}>
      <img src={logo_words} alt="" className={style.logo} />
      <div className={style.loginHeader}>
        <h2>Sign in</h2>
        <button onClick={() => setSignUp(true)}>Register</button>
      </div>
      <form onSubmit={handleLogin}>
        <div className={style.loginInput}>
          <label htmlFor="email">Email address</label>
          <input
            className={style.loginFormInputField}
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.loginInput}>
          <label htmlFor="password">Password</label>
          <input
            className={style.loginFormInputField}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign in</button>
      </form>
      <button>Demo user login</button>
    </div>
  );
}
