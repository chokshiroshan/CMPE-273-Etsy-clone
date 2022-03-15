import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ProductList from "../Home/ProductList";
import { Link } from "react-router-dom";
import Redirect from "../Redirect/Redirect";
import Cookies from "js-cookie";
const axios = require("axios");

export default function Profile() {
  const [userData, setUserData] = useState("");

  let shop;
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/getuserdata", {
  //       params: { user: Cookies.get("username") },
  //     })
  //     .then(function (response) {
  //       setUserData(response.data[0]);
  //     });
  // }, []);
  useEffect(() => {
    async function getUserData() {
      const response = await axios.get("http://localhost:3001/getuserdata", {
        params: { user: Cookies.get("username") },
      });
      setUserData(response.data[0]);
    }
    getUserData();
  }, []);

  console.log(userData);

  if (userData.shop == null) {
    shop = (
      <Link
        className="btn btn-primary default-button"
        to="/checkshop"
        role="button"
      >
        Create Shop
      </Link>
    );
  } else {
    shop = (
      <Link className="btn btn-primary default-button" to="/shop" role="button">
        Shop
      </Link>
    );
  }

  return (
    <>
      <Redirect />
      <Navbar loggedin={false} />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <img src={userData.image}></img>
            <h1>{userData.username}</h1>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
            <p>{userData.gender}</p>
            <p>{userData.birthday}</p>
            <p>{userData.address}</p>
            <p>{userData.city}</p>
            <p>{userData.country}</p>
            <Link
              className="btn btn-primary default-button"
              to="/update"
              role="button"
            >
              Update Profile
            </Link>
            {shop}
          </div>
        </div>
      </div>
    </>
  );
}
