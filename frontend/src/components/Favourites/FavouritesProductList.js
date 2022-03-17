import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function FavouritesProductList() {
  const [items, setItems] = useState([[]]);
  useEffect(() => {
    async function getFavourites() {
      const response = await axios.get("http://localhost:3001/getfavourites", {
        params: { user: Cookies.get("username") },
      });
      setItems(response.data);
    }

    getFavourites();
  }, []);

  return (
    <>
      {items.map((item) => (
        <div className="col-md-3">
          <div className="card">
            <img className="card-img-top w-100 d-block" />
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                <b>Category: </b>
                {item.category}
              </p>
              <p className="card-text">${item.price}</p>
              {item.quantity == 0 ? (
                <h3 className="soldout">Sold Out</h3>
              ) : (
                <Link
                  className="btn btn-primary default-button"
                  type="button"
                  to="/product"
                  state={item}
                >
                  Buy
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
