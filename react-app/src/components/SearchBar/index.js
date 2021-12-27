import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import style from "./searchbar.module.css";

export default function SearchBar() {
  const history = useHistory();
  const [query, setQuery] = useState();
  function searchFunc(e) {
    e.preventDefault();
    history.push(`/listings?name=${query}`);
    console.log("~!~~!~~!!~!~~!~!!~~!");
  }
  return (
    <div className={style.container}>
      <form onSubmit={searchFunc}>
        <input
          type="search"
          className={style.search}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={style.searchButton}></button>
      </form>
    </div>
  );
}
