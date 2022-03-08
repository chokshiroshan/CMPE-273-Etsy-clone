import React from 'react';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Home/ProductList';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <>
    <Navbar loggedin={false}/>
        <div className="container">
        <div className="row">
            <div className="col-md-12 mt-3">
                <h1>User Name</h1>
                <p>username@etsy.com</p>
                <p>+1 408 650 2099</p>
                <Link className="btn btn-primary default-button" to="/update" role="button">Update Profile</Link>
                <Link className="btn btn-primary default-button" to="/checkshop" role="button">Create Shop</Link>
                <Link className="btn btn-primary default-button" to="/shop" role="button">Shop</Link>

            </div>
        </div>
        <div className="row mt-3">
            <div className="col col-md-3">
                <h1>Favourites</h1>
            </div>
            <div className="col col-md-4 offset-5">
            <form className="me-auto search-form" target="_self">
                    <div className="d-flex align-items-center"><label className="form-label d-flex mb-0" htmlFor="search-field"><i className="fa fa-search" style={{margin:"5px"}}></i></label><input className="form-control search-field" type="search" id="search-field" name="search" /></div>
                </form>
            </div>
        </div>
        <hr/>
        <ProductList/>
        </div>
        
    </>
  )
}
