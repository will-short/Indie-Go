import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import UsersList from "./components/UserList";
import User from "./components/User";
import { authenticate } from "./store/session";
import ProfilePage from "./components/ProfilePage";
import ListingPostPage from "./components/ListingPostPage";
import { allListings } from "./store/listings";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import GamePage from "./components/GamePage";
import Cart from "./components/Cart";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [cart, setCart] = useState(false);
  console.log(cart);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(allListings());
      await setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setCart={setCart} cart={cart} />
      <Cart cart={cart} setCart={setCart}></Cart>
    </BrowserRouter>
  );
}

export default App;
