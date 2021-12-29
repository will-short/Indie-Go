import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import UsersList from "../UserList";
import ProfilePage from "../ProfilePage";
import ListingPostPage from "../ListingPostPage";
import HomePage from "../HomePage";
import SearchPage from "../SearchPage";
import GamePage from "../GamePage";
import Item from "./item";
export default function Cart({ cart, setCart }) {
  const session = useSelector((state) => state.session);
  let total = 0;
  if (session?.user?.cart_listings?.length) {
    total = session?.user?.cart_listings?.reduce(
      (acc, listing) => acc + +listing.price,
      0
    );
  }
  return (
    <div className="main">
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/users" exact={true}>
          <UsersList />
        </Route>
        <Route path="/users/:userId" exact={true}>
          <ProfilePage />
        </Route>
        <Route
          path={[
            "/users/:userId/listings/new/:id",
            "/listings/:listingId/edit/:id",
          ]}
        >
          <ListingPostPage />
        </Route>
        <Route path="/listings/:listingId">
          <GamePage />
        </Route>
        <Route path="/listings">
          <SearchPage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
      <div className={style.cart}>
        {cart && (
          <div className={style.cartSide}>
            <h2>Your Cart</h2>
            {session?.user?.cart_listings?.map((listing) => (
              <Item game={listing} />
            ))}
            <button
              className={
                "primary-button" +
                " " +
                (!session?.user?.cart_listings?.length && "disabled")
              }
            >
              Checkout total: ${total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
