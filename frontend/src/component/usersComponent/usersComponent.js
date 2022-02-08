import axios from "axios";
import React, { useState, useEffect } from "react";
import "./usersComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  /////////////////////////////
  const getAllUsers = () => {
    console.log("get");
    axios
      .get(`http://localhost:5000/user`)
      .then((response) => {
        console.log(response.data.results);
        setUsers(response.data.results);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  ////////////////////////////////////////
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/${id}`, {
        // headers: {
        //   Authorization: `Basic ${state.token}`,
        // },
      })
      .then((result) => {
        getAllUsers();
      })
      .catch((error) => {});
  };

  return (
    <div className="allUsers">
      <p>Users List</p>
      ////////////////////////////////////////////////
      <table>
        <caption>2019 Fourth Quarter Report</caption>
        <thead>
          <tr>
            <th></th>
            <th>October</th>
            <th>November</th>
            <th>December</th>
          </tr>
        </thead>
      </table>
      \ /////////////////////////////////////////////
      {users.map((element) => {
        return (
          <div key={element.id} className="user">
            <p>{element.id}</p>
            <p>{element.firstName}</p>
            <p>{element.email}</p>
            <p>Delete</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
