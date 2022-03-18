import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";
import SearchProductList from "./SearchProductList";
import Search from "./Search";

export default function Home({ userData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("");
  let search = searchParams.get("search");
  return (
    <>
      <Navbar />
      <div className="container">
        {search ? (
          <Search filter={filter} setFilter={setFilter} />
        ) : (
          <div>
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
          </div>
        )}
        <div className="row mt-5">
          {search ? (
            <SearchProductList
              keyword={search}
              filter={filter}
              setFilter={setFilter}
            />
          ) : (
            <ProductList />
          )}
        </div>
      </div>
    </>
  );
}
