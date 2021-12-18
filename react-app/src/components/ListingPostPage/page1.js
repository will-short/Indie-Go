import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import { useState } from "react";
import { useRef } from "react";

export default function Page1({ data, absPath }) {
  let { name, setName, description, setDescription } = data;
  let [linkToggle, setLinkToggle] = useState("");
  useEffect(() => {
    if (
      name.length <= 0 ||
      name.length >= 100 ||
      description.length <= 0 ||
      description.length >= 500
    )
      setLinkToggle("disabled");
    else setLinkToggle("");
  }, [name, description]);
  return (
    <div className={style.page1Container}>
      <label htmlFor="name">
        Name - Required
        <input
          name="name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="description">
        Description - Required
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <Link
        className={`primary-link ${linkToggle}`}
        id="forward"
        to={absPath + "2"}
      >
        Save and continue
      </Link>
    </div>
  );
}
