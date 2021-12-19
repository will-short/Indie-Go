import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import { useState } from "react";

export default function Page1({ data, absPath }) {
  let { video, setVideo, images, setImages } = data;
  let [linkToggle, setLinkToggle] = useState("");
  let [image1, setImgage1] = useState(images[0]);
  let [image2, setImgage2] = useState(images[1]);
  let [image3, setImgage3] = useState(images[2]);
  let [image4, setImgage4] = useState(images[3]);
  let [image5, setImgage5] = useState(images[4]);
  useEffect(() => {
    images.length <= 0 ? setLinkToggle("disabled") : setLinkToggle("");
    setImages([image1, image2, image3, image4, image5].filter((el) => el));
  }, [image1, image2, image3, image4, image5]);
  useEffect(() => {
    let videoEl = document.querySelector("source");
    if (video && videoEl) {
      videoEl.src = URL.createObjectURL(video);
      videoEl.parentElement.load();
    }
  }, [video]);

  return (
    <div className={style.page2Container}>
      <div className={style.videoContainer}>
        <video width="300" controls>
          <source />
        </video>
        <label htmlFor="video">
          {video ? "redo upload" : "Upload Trailer"}
          <input
            type="file"
            name="video"
            id="video"
            accept="video/mp4"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className={style.imageUpload}>
        <img src={image1 && URL.createObjectURL(image1)} alt="" />
        <label htmlFor="upload1">
          Upload Header Image - Required
          <input
            name="image"
            type="file"
            id="upload1"
            accept="image/*"
            onChange={(e) => setImgage1(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className={style.imageUpload}>
        <img src={image2 && URL.createObjectURL(image2)} alt="" />
        <label htmlFor="upload2">
          Upload Screen Shot Image - Required
          <input
            name="image"
            type="file"
            id="upload2"
            accept="image/*"
            onChange={(e) => setImgage2(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className={style.imageUpload}>
        <img src={image3 && URL?.createObjectURL(image3)} alt="" />
        <label htmlFor="upload3">
          Upload Screen Shot Image - Optional
          <input
            name="image"
            type="file"
            id="upload3"
            accept="image/*"
            onChange={(e) => setImgage3(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className={style.imageUpload}>
        <img src={image4 && URL?.createObjectURL(image4)} alt="" />
        <label htmlFor="upload4">
          Upload Screen Shot Image - Optional
          <input
            name="image"
            type="file"
            id="upload4"
            accept="image/*"
            onChange={(e) => setImgage4(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className={style.imageUpload}>
        <img src={image5 && URL?.createObjectURL(image5)} alt="" />
        <label htmlFor="upload5">
          Upload Screen Shot Image - Optional
          <input
            name="image"
            type="file"
            id="upload5"
            accept="image/*"
            onChange={(e) => setImgage5(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <Link
        className={`primary-link ${linkToggle}`}
        id="forward"
        to={absPath + "3"}
      >
        Save and continue
      </Link>
    </div>
  );
}
