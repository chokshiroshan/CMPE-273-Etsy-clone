import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Form from "./Form";

export default function Shop() {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);


  const toggleAdd = () => {
    setAdd(!add);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row" style={{ borderBottom: "1px solid" }}>
          <div className="col col-md-2">
            <img />
          </div>
          <div className="col col-md-3">
            <h1>Store Name</h1>
            <a
              className="btn btn-light default-button"
              role="button"
              onClick={toggleAdd}
            >
              Add Items
            </a>
          </div>
          <div className="col col-md-2 offset-5">
            <p>Store Owner</p>
            <p>Owner Name</p>
            <p>Owner Contact</p>
          </div>
        </div>
        {add && (
          <div className="modal-custom">
            <div onClick={toggleAdd} className="overlay-custom"></div>
            <div className="modal-content">
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8 offset-1">
                  <h2>Add an item.</h2>
                </div>
                <div className="col-md-1 justify-content-end">
                  <a className="btn mt-2" role="button" onClick={toggleAdd}>
                    ❌
                  </a>
                </div>
              </div>
              <Form />
              <a
                className="btn default-button mt-3"
                role="button"
                onClick={toggleAdd}
              >
                Add
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1>Items</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="card" style={{ position: "inherit" }}>
              <img className="card-img-top w-100 d-block" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                  justo odio, dapibus ac facilisis in, egestas eget quam. Donec
                  id elit non mi porta gravida at eget metus.
                </p>
                <a className="btn btn-primary default-button" type="button" onClick={toggleEdit}>
                  Edit
                </a>
                <a className="btn btn-primary default-button" type="button">
                  Delete
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 offset-6" style={{borderLeft:"1px solid"}}>
            <h3>Sales Details</h3>
          </div>
        </div>
        {edit && (
          <div className="modal-custom">
            <div onClick={toggleEdit} className="overlay-custom"></div>
            <div className="modal-content">
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8 offset-1">
                  <h2>Edit an item.</h2>
                </div>
                <div className="col-md-1 justify-content-end">
                  <a className="btn mt-2" role="button" onClick={toggleEdit}>
                    ❌
                  </a>
                </div>
              </div>
              <Form />
              <a
                className="btn default-button mt-3"
                role="button"
                onClick={toggleEdit}
              >
                Edit
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
