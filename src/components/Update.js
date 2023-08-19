import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Update = () => {
const [id, setId] = useState(0);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [contact, setContact] = useState("");
const history = useNavigate() 

  // To handle updating user data
const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`https://64e07afb50713530432c5870.mockapi.io/userdata/${id}`, {
            name: name,
            email: email,
            contact: contact
        });
              // Redirect to the Read page after successful update
        history("/read");
    } catch (error) {
        alert("Server Error");
        console.error("An error occurred:", error);
    }
  };
  // Load existing user data from local storage when the component mounts
useEffect(()=>{
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setContact(localStorage.getItem("contact"));
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
     
        <h2>Update existing User Details</h2>
        <form className="needs-validation" noValidate> 
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" required
             onChange={(e)=> setName(e.target.value)} 
             value={name}
              />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e)=> setEmail(e.target.value)}
              required
              value={email}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="number" className="form-control" 
            onChange={(e)=> setContact(e.target.value)}  
            value={contact}
            required />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <button type="submit" 
          onClick={handleUpdate} 
          className="btn btn-primary">
            Upate
          </button>
          {'\u00A0'}
          <Link to="/read">
                    <button 
          className="btn btn-secondary">
            Back
          </button>
          </Link>
        </form>
      </div>
      </>

  )
}

export default Update