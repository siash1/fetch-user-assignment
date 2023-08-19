import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

    // Fetching data from the API
  async function getData() {
    try {
      const response = await axios.get(
        "https://64e07afb50713530432c5870.mockapi.io/userdata"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      alert("Server Error");
      console.error("An error occurred:", error);
    }
  }


  // Delete data for a id
  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://64e07afb50713530432c5870.mockapi.io/userdata/${id}`
      );
      await getData();
    } catch (error) {
      alert("Server Error");
      console.error("An error occurred:", error);
    }
  }
  // Storing data in local storage for editing
  const storeData = (id,name, email, contact) =>{
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("contact", contact);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      
      <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link to={"/"}>
            <button type="button" className="btn btn-primary" >Create New User</button>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>

    <div className="container">
      <h2>User Details</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No.</th>
          </tr>
        </thead>
        {data.map((items) => {
          return (
            <tbody key={items.id}>
              <tr>
                <th scope="row">{items.id}</th>
                <td>{items.name}</td>
                <td>{items.email}</td>
                <td>{items.contact}</td>
                <td>
                  <Link to="/update">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        storeData(items.id, items.name, items.email, items.contact)
                      }
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(items.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
    </>
  );
};

export default Read;
