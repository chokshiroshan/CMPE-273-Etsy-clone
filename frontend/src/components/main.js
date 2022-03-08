import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import Update from './Profile/Update';
import ProductPage from './ProductPage/ProductPage';
import Profile from './Profile/Profile';
import Cart from './Cart/Cart';
import Purchased from './Cart/Purchased';
import CreateShop from './Shop/CheckShop';
import CheckShop from './Shop/CheckShop';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            
            <div>
                <Routes>
                {/*Render Different Component based on Route*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/update" element={<Update/>}/>
                <Route path="/product" element={<ProductPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/purchased" element={<Purchased/>}/>
                <Route path="/checkshop" element={<CheckShop/>}/>

                </Routes>
            </div>
            
        )
    }
}
//Export The Main Component
export default Main;