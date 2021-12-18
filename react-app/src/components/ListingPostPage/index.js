import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  Route,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import { useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";

export default function ListingPostPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState();
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  let url = useLocation();
  const absPath = url.pathname.split("new")[0] + "new/";
  return (
    <main className={style.main}>
      <header className={style.header}>
        <NavLink
          to={absPath + "1"}
          className={style.first}
          activeClassName={style.active}
        >
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Name/Description</span>
        </NavLink>
        <span id="1"></span>
        <NavLink
          to={absPath + "2"}
          className={style.second}
          activeClassName={style.active}
        >
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Media</span>
        </NavLink>
        <span id="2"></span>
        <NavLink
          to={absPath + "3"}
          className={style.third}
          activeClassName={style.active}
        >
          <div>
            <span class="material-icons">done</span>
          </div>
          <span>Preview</span>
        </NavLink>
      </header>
      <Switch>
        <Route exact path={absPath + "1"}>
          <Page1
            data={{ name, setName, description, setDescription }}
            absPath={absPath}
          />
        </Route>
        <Route exact path={absPath + "2"}>
          <Page2
            data={{ video, setVideo, images, setImages }}
            absPath={absPath}
          />
        </Route>
        <Route exact path={absPath + "3"}>
          <Page3
            data={{ video, images, name, description }}
            absPath={absPath}
          />
        </Route>
      </Switch>
    </main>
  );
}
