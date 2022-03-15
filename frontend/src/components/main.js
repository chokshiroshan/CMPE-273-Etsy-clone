import React, { Component, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import SignOut from "./SignOut/SignOut";
import Register from "./Register/Register";
import Update from "./Profile/Update";
import ProductPage from "./ProductPage/ProductPage";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
import Purchased from "./Cart/Purchased";
import CheckShop from "./Shop/CheckShop";
import Shop from "./Shop/Shop";
import Search from "./Home/Search";
import Favourites from "./Favourites/Favourites";
import Cookies from "js-cookie";

//Create a Main Component
const Main = () => {
  const auth = Cookies.get("auth");
  return (
    <div>
      <Routes>
        {/*Render Different Component based on Route*/}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/update" element={<Update />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchased" element={<Purchased />} />
        <Route path="/checkshop" element={<CheckShop />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/favourites"
          element={auth ? <Favourites /> : <SignIn />}
        ></Route>
      </Routes>
    </div>
  );
};

//Export The Main Component
export default Main;
