import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'

export default function ProductPage() {
    
  return (
      <>
      <Navbar/>
      <div className="container">
        <div className="row">
            <div className="col-md-12 mt-3">
                <h1>Product Page</h1>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6"><img/></div>
            <div className="col-md-6">
                <p>Shop Name</p>
                <h1>Product Name</h1>
                <p><strong>10$</strong></p>
                <p>Description: Since we want our counter to be the most functional possible, we're going to add a button to reset the counter to zero. Its event handler will reference a function that will just set count and quantity state values to zero.</p>
                <label>Quantity</label>
                <input className="form-control" type="number"></input>
              
                
                <div className="row mt-2">
                    <div className="col-md-6"><a className="btn btn-light action-button default-button" role="button" href="#">Add to Cart</a></div>
                    <div className="col-md-6"><a className="btn btn-light action-button default-button" role="button" href="#">Add to Favourites</a></div>
                </div>
            </div>
        </div>
    </div>
      </>
  )
}
