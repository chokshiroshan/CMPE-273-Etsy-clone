import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const location = useLocation();
  const item = location?.state;
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Redirect />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1>Product Page</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img />
          </div>
          <div className="col-md-6">
            <p>{item.shop}</p>
            <h1>{item.name}</h1>
            <p>
              <strong>{item.price}$</strong>
            </p>
            <p>Description: {item.description}</p>
            <label>Quantity</label>
            <input
              className="form-control"
              type="number"
              min="1"
              max={item.quantity}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            ></input>

            <div className="row mt-2">
              <div className="col-md-6">
                <a
                  className="btn btn-light action-button default-button"
                  role="button"
                  href="#"
                >
                  Add to Cart
                </a>
              </div>
              <div className="col-md-6">
                <a
                  className="btn btn-light action-button default-button"
                  role="button"
                  href="#"
                >
                  Add to Favourites
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
