import React from 'react';
import Navbar from '../Navbar/Navbar';
import AvatarUpdate from './AvatarUpdate';
import CountrySelect from './CountrySelect';

export default function Update() {
  return (
    <>
    <Navbar loggedin={true}/>
    <h1 className="offset-1">Edit Profile</h1>
    <div className="container profile profile-view" id="profile">
        <div className="row">
            <div className="col">
                <form>
                    <AvatarUpdate/>
                    
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">Name</label><input className="form-control" type="text"/></div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">Email</label><input className="form-control" type="text"/></div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">Phone</label><input className="form-control" type="number"/></div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">Gender</label>
                            <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-1"/><label className="form-check-label" htmlFor="formCheck-1">Male</label></div>
                            <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-4"/><label className="form-check-label" htmlFor="formCheck-4">Female</label></div>
                            <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-3"/><label className="form-check-label" htmlFor="formCheck-3">Rather not say</label></div>
                            <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-2"/><label className="form-check-label" htmlFor="formCheck-2">Custom</label></div>
                        </div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">Birthday</label><input className="form-control" type="date"/></div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label ">Address</label><textarea className="form-control"></textarea></div>
                    </div>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><label className="form-label">City</label><input className="form-control" type="text"/></div>
                    </div>
                    <CountrySelect/>
                    <div className="row profile-row justify-content-center mt-2">
                        <div className="col-md-4"><a className="btn btn-light action-button default-button" role="button" href="#">Update</a></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
