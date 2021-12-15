import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profilepageStyle from "./profilepage.module.css";
import User from "../User";
export default function ProfilePage() {
  return (
    <main className={profilepageStyle.main}>
      <User />
    </main>
  );
}
