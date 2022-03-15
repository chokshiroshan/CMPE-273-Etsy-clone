import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Item from "./Item";
import Redirect from "../Redirect/Redirect";

export default function Cart() {
  return (
    <>
      <Redirect />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
            <h1>Cart</h1>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 bg-light">
                      <div className="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Quantity</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <Item inCart={true} />
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white rounded shadow-sm">
          <div className="col-lg-6 p-5 bg-white rounded shadow-sm offset-6">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
              Order summary{" "}
            </div>
            <div className="p-4">
              <p className="font-italic mb-4">
                Shipping and additional costs are calculated based on values you
                have entered.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Order Subtotal </strong>
                  <strong>$390.00</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Shipping and handling</strong>
                  <strong>$10.00</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Tax</strong>
                  <strong>$0.00</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Total</strong>
                  <h5 className="font-weight-bold">$400.00</h5>
                </li>
              </ul>
              <Link
                to="/purchased"
                className="btn btn-dark rounded-pill py-2 btn-block default-button"
              >
                Procceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
