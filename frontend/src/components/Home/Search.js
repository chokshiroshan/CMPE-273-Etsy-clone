import React from "react";
import Navbar from "../Navbar/Navbar";
import ProductList from "./ProductList";

export default function Search() {
  return (
    <>
      <Navbar loggedin={false} />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3">
            <h2>Search Result</h2>
          </div>
          <div className="col-md-1 mt-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-1 mt-3">Filter</div>
        </div>
        <ProductList />
      </div>
    </>
  );
}
