import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ShopItems(props) {
  const [items, setItems] = useState([[]]);
  const [editImage, setEditImage] = useState("");
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [edit, setEdit] = useState(false);
  const [shop, setShop] = useState(props.shop);
  console.log(shop);
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const edititem = () => {
    const data = {
      shop: shop,
      name: editName,
      category: editCategory,
      description: editDescription,
      price: editPrice,
      quantity: editQuantity,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://127.0.0.1:3001/edititem", data).then((response) => {
      if (response.data === "SUCCESS") {
        console.log("Status Code : ", response.status);
        setEdit(false);
        setEditName("");
        setEditCategory("");
        setEditDescription("");
        setEditPrice("");
        setEditQuantity("");
      }
      if (response.data === "UNSUCCESS") {
        console.log(response.data);
      }
    });
  };
  useEffect(() => {
    async function getItems() {
      const response = await axios.get("http://localhost:3001/getitems", {
        params: { shop: shop },
      });
      setItems(response.data);
    }
    getItems();
    console.log(items);
  }, []);
  return (
    <>
      <div className="col-md-3">
        <div className="card" style={{ position: "inherit" }}>
          <img className="card-img-top w-100 d-block" />
          <div className="card-body">
            {/* <h4 className="card-title">{items[0].name}</h4> */}
            <p className="card-text">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
              non mi porta gravida at eget metus.
            </p>
            <a
              className="btn btn-primary default-button"
              type="button"
              onClick={toggleEdit}
            >
              Edit
            </a>
            <a className="btn btn-primary default-button" type="button">
              Delete
            </a>
          </div>
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
            <div className="row profile-row justify-content-center">
              <div className="col-md-8">
                <label className="form-label">Item Image</label>
                <div className="avatar">
                  <div className="avatar-bg center"></div>
                </div>
                <input
                  className="form-control"
                  type="file"
                  name="avatar-file"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />
              </div>
            </div>
            <div className="row profile-row justify-content-center mt-2">
              <div className="col-md-8">
                <label className="form-label">Item Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
            </div>
            <div className="row profile-row justify-content-center mt-2">
              <div className="col-md-8">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  defaultValue={"DEFAULT"}
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    SELECT CATEGORY
                  </option>
                  <option value="Afghanistan">Shoes</option>
                  <option value="Åland Islands">Cloths</option>
                </select>
              </div>
            </div>
            <div className="row profile-row justify-content-center mt-2">
              <div className="col-md-8">
                <label className="form-label">Price</label>
                <input
                  className="form-control"
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row profile-row justify-content-center mt-2">
              <div className="col-md-8">
                <label className="form-label ">Description</label>
                <textarea
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row profile-row justify-content-center mt-2">
              <div className="col-md-8">
                <label className="form-label">Quantity</label>
                <input
                  className="form-control"
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />
              </div>
            </div>

            <a
              className="btn default-button mt-3"
              role="button"
              onClick={edititem}
            >
              Edit
            </a>
          </div>
        </div>
      )}
    </>
  );
}
