import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header/Header";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";
import NewProduct from "./component/createNewProduct/createNewProduct";

function App() {
  return (
    <div className="App">

<Header/>
     
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/header" element={<Header />} /> */}
        <Route path="/NewProduct" element={<NewProduct />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
