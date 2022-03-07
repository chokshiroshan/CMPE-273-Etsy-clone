import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';

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
                </Routes>
            </div>
            
        )
    }
}
//Export The Main Component
export default Main;