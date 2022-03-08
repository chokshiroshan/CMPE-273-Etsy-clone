import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function Register() {
  return (
    <>
    <Navbar loggedin={false}/> 
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""/>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""/>
      <label for="inputConfirmPassword" class="sr-only">Confirm Password</label>
      <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Confirm Password" required=""/>

      
      <a class="btn btn-lg btn-block default-button mt-2" type="submit">Register</a>
      
    </form>
    </>
  )
}
