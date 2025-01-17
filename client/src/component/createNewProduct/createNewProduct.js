import axios from "axios";
import React, { useState, useEffect } from "react";
import "./createNewProduct.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cloudinary from "../Cloudinary/Cloudinary";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import jwt_decode from "jwt-decode";
const NewProduct = ({ lat, setLat, long, setLong }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  // const [token, setToken] = useState("");
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  const token = state.token;
  console.log(token);
  const decode = state.token && jwt_decode(state.token);
  let user_id = (decode && decode.userId) || (decode && decode.sub);
  console.log(decode);
  const createNewProduct = () => {
    axios
      .post(
        "/product/",
        {
          title,
          description,
          price,
          image,
          category,
          latitude: lat,
          longitude: long,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  /////////////////////////////////////GeoLocation////////////////////////////////////

  const geoLocate = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      //   location = position;
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log(lat);
  };

  ////////////////////////////////////////////cloudinary////////////////////////////////

  // return (
  //   <div>
  //     <input
  //       placeholder="title"
  //       onChange={(e) => {
  //         setTitle(e.target.value);
  //       }}
  //     ></input>
  //     <input
  //       placeholder="description"
  //       onChange={(e) => {
  //         setDescription(e.target.value);
  //       }}
  //     ></input>
  //     <input
  //       placeholder="Price"
  //       onChange={(e) => {
  //         setPrice(e.target.value);
  //       }}
  //     ></input>
  //     {/* <input
  //       placeholder="ImageURL"
  //       onChange={(e) => {
  //         setImage(e.target.value);
  //       }}
  //     ></input> */}
  //     <Cloudinary setImage={setImage} />
  //     <input
  //       placeholder="Category"
  //       onChange={(e) => {
  //         setCategory(e.target.value);
  //       }}
  //     ></input>
  //     <button onClick={createNewProduct} classNameName="create">
  //       Create Product
  //     </button>
  //     <p>{message}</p>
  //   </div>
  // );
  return (
    <>
      {/* <img src="img/dark-logo.png" className="logo" alt=""/> */}
      <span className="create">Create Product</span>

      <div className="form">
        <input
          type="text"
          id="product-name"
          placeholder="product name"
          className="inputprod"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          id="short-des"
          placeholder="short line about the product"
          className="inputprod"
        />
        <textarea
          className="text-area"
          id="des"
          placeholder="detail description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="product-price">
          <input
            type="number"
            id="actual-price"
            placeholder="actual price"
            className="inputprod"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            type="number"
            id="discount"
            placeholder="discount percentage"
            className="inputprod"
          />
        </div>
        <input
          type="number"
          id="stock"
          min="20"
          placeholder="item in stocks"
          className="inputprod"
        />
        <textarea
          className="text-area"
          id="tags"
          placeholder="Enter categories here, for example - cars, Electonics, Clothes, "
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></textarea>
        <div className="product-info">
          <p className="text">upload image</p>

          <Cloudinary setImage={setImage} />
        </div>
        <div className="location">
          <p>Insert product location</p>
          <input
            style={{ height: "33px" }}
            placeholder="Latitude"
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
            }}
          />
          <input
            style={{ height: "33px", marginLeft: "10px", marginRight: "10px" }}
            placeholder="Longitude"
            value={long}
            onChange={(e) => {
              setLong(e.target.value);
            }}
          />
          <button onClick={geoLocate} className="btn">
            Take Current Location
          </button>
        </div>
        <input type="checkbox" className="checkbox" id="tac" checked />
        <label for="tac">OpenSooq take 5% from your total sell</label>
        <div className="buttons">
          <button
            className="btn"
            id="add-btn"
            onClick={() => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                confirmButtonColor: "#4267b3",
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {
                  createNewProduct();
                  Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
          >
            add product
          </button>
          <button className="btn" id="save-btn">
            save draft
          </button>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
