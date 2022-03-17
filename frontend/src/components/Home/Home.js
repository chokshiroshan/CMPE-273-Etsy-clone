import React from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import ProductList from "./ProductList";

export default function Home({ userData }) {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-3 offset-4">
            <h1>Welcome, {userData.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1>Popular</h1>
          </div>
        </div>
        <div className="row mt-5">
          <ProductList />
        </div>
      </div>
    </>
  );
}
