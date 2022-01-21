import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

import style from "./searchbar.module.css";

export default function SearchBar() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const listings = useSelector((state) => state.listings);
  const [list, setList] = useState([]);
  function searchFunc(e, search) {
    e.preventDefault();
    console.log(query);

    if (query)
      history.push(
        `/listings?name=${search?.toLowerCase() || query?.toLowerCase()}`
      );
    document.activeElement.blur();
  }
  function gameList(e, newVal) {
    console.log(query);
    setQuery(newVal);
    if (newVal) {
      setList(
        Object.values(listings)
          .filter((listing) =>
            listing.name.toLowerCase().includes(newVal.toLowerCase())
          )
          .slice(0, 10)
      );
    } else {
      setList([]);
    }
  }
  return (
    <div className={style.container}>
      <form onSubmit={searchFunc}>
        <Autocomplete
          clearOnEscape
          disableClearable
          clearOnBlur
          value={query}
          options={list}
          getOptionLabel={(option) => option.name || option}
          onInputChange={(event, value, reason) => {
            if (reason === "input") {
              gameList(event, value);
            }
          }}
          onChange={(event, newValue) => {
            setQuery(newValue?.name);
            if (newValue?.id) history.push(`/listings/${newValue?.id}`);
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="search"
                {...params.inputProps}
                className={style.search}
              />
            </div>
          )}
        />
        <button className={style.searchButton}></button>
      </form>
      {/* <ul>
        {list.map((list) => (
          <li>{list.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
