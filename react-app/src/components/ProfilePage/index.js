import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profilepageStyle from "./profilepage.module.css";
import User from "../User";
import GameInfo from "../GameInfo";

export default function ProfilePage() {
  const session = useSelector((state) => state.session);
  const listings = useSelector((state) => state.listings);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, listings]);
  return (
    <main className={profilepageStyle.main}>
      <User user={user} />
      <div className={profilepageStyle.gameList}>
        {user?.listings?.map((listing) => (
          <GameInfo key={listing.id} game={listing} user={user} />
        ))}
      </div>
    </main>
  );
}
