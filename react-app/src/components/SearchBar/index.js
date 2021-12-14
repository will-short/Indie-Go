import React from "react";

import style from "./searchbar.module.css";

export default function SearchBar() {
  return (
    <div className={style.container}>
      <input type="search" className={style.search} />
      <div className={style.dropDown}></div>
    </div>
  );
}
