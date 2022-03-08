import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function CheckShop() {
  return (
    <>
    <Navbar/>
    <div className="container shop-content">
        <div className="row">
            <div className="col-md-12">
                <h1>Name your shop</h1>
                <p>Choose a memorable name that reflects your style.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12"><input type="search" id='create-shop-search' /><a className="btn btn-light action-button default-button" role="button" href="#">Check Availability</a></div>
        </div>
    </div>
    </>
  )
}
