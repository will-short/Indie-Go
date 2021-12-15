import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import logo_words from "../images/capstone-logo-words.svg";
import { signUp } from "../../store/session";
import { useEffect } from "react";
export default function Signup({ setModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [username, setUsername] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(image, username, email, password));
    setModal(false);
  };
  useEffect(() => {
    let imageEl = document.querySelector(".modals_imageUpload__3jm60 > img");
    if (image && imageEl) imageEl.src = URL.createObjectURL(image);
  }, [image]);

  return (
    <div
      className={style.modalLogin}
      style={{ height: "620px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={logo_words} alt="" className={style.logo} />
      <div className={style.loginHeader}>
        <h2>Create your account</h2>
      </div>
      <form onSubmit={handleSignup} className={style.signupForm}>
        <div className={style.imageUpload}>
          <img src={image} alt="" />
          <label htmlFor="upload">
            Upload Profile Image
            <input
              name="image"
              type="file"
              id="upload"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
        <div className={style.loginInput}>
          <label htmlFor="username">Username</label>
          <input
            className={style.loginFormInputField}
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className={style.loginInput}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={style.loginFormInputField}
            name="confirmPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
}
