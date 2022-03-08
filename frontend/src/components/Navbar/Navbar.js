import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    let signButton = <Link className="btn btn-light action-button" role="button" to="/signin" >Sign in</Link>
    if(props.loggedin){
       signButton = <Link className="btn btn-light action-button" role="button" to="/register" >Register</Link>
    }
  return (
      <>
    <nav className="navbar navbar-light navbar-expand-lg navigation-clean-search">
        <div className="container"><Link className="navbar-brand" to="/">Etsy</Link><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav"></ul>
                <form className="me-auto search-form" target="_self">
                    <div className="d-flex align-items-center"><label className="form-label d-flex mb-0" htmlFor="search-field"><i className="fa fa-search"></i></label><input className="form-control search-field" type="search" id="search-field" name="search" /></div>
                </form>
                <Link className="btn btn-light action-button" role="button" to="/profile">Favourites</Link>
                {signButton}
                <Link className="btn btn-light action-button" role="button" to="/cart">Cart</Link>
                
                
            </div>
        </div>
    </nav>
    </>
  )
}
