import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./user.module.css";
function User() {
  const session = useSelector((state) => state.session);
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
  }, [userId]);

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
      {session?.user?.id === +userId && (
        <Link to={`/users/${user.id}/listings/new`}>New Listing</Link>
      )}
    </div>
  );
}
export default User;
