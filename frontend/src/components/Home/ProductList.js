import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductList() {
  return (
    <div className="row mt-5">
            <div className="col-md-3">
                <div className="card"><img className="card-img-top w-100 d-block"/>
                    <div className="card-body">
                        <h4 className="card-title">Title</h4>
                        <p className="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p><Link className="btn btn-primary default-button" type="button" to="/product">Buy</Link>
                    </div>
                </div>
            </div>
        </div>
  )
}
