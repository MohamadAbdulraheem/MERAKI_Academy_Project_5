import axios from "axios";
import React, { useState, useEffect } from "react";
import "./geoLocate.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const GeoLocate = ({ lat, setLat, long, setLong }) => {
  
  return (
    <div>
      <p> Lat: {lat}</p>
      <p> Long: {long}</p>
    </div>
  );
};

export default GeoLocate;
