import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./navbar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function UserDropdown() {
  return <div className={style.userDropdown}></div>;
}
