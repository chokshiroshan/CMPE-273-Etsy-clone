import React from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1>Popular</h1>
          </div>
        </div>
        <ProductList />
      </div>
    </>
  );
}
