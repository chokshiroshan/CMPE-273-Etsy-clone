import React from "react";
import Navbar from "../Navbar/Navbar";
import ProductList from "../Home/ProductList";
import { Link } from "react-router-dom";
import Redirect from "../Redirect/Redirect";

export default function Profile() {
  return (
    <>
      <Redirect />
      <Navbar loggedin={false} />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1>User Name</h1>
            <p>username@etsy.com</p>
            <p>+1 408 650 2099</p>
            <Link
              className="btn btn-primary default-button"
              to="/update"
              role="button"
            >
              Update Profile
            </Link>
            <Link
              className="btn btn-primary default-button"
              to="/checkshop"
              role="button"
            >
              Create Shop
            </Link>
            <Link
              className="btn btn-primary default-button"
              to="/shop"
              role="button"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
