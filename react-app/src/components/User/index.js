import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./user.module.css";
function User({ user }) {
  const session = useSelector((state) => state.session);

  if (!user) {
    return null;
  }
  return (
    <div className={style.container}>
      <img src={user?.image_url} alt="" />
      <span>
        <strong>{user?.username}</strong>
      </span>
      <span>
        Games listed: <strong>5</strong>
      </span>
      <span>tags:</span>
      <div>Tags go here</div>
      {session?.user?.id === +user?.id && (
        <Link className="primary-link" to={`/users/${user.id}/listings/new/1`}>
          New Listing
        </Link>
      )}
    </div>
  );
}
export default User;
