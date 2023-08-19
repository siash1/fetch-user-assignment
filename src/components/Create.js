import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Create = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false); 
  const history = useNavigate();
  const header = {"Access-Control-Allow-Origin": "*"};
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      setLoading(true); // Show spinner while submitting
      await axios.post("https://64e07afb50713530432c5870.mockapi.io/userdata", {
        name: name,
        email: email,
        contact: contact,
        header
      });
      setLoading(false); // Hide spinner after successful submission
      history("/read");
    } catch (error) {
      alert("Server Error");
      console.error("An error occurred:", error);
      setLoading(false); // Hide spinner in case of error
    }
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* Link to user details */}
                <Link to={"/read"}>
                  <button type="button" className="btn btn-primary" >User Details</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
      <div className="container">
        <h2>Enter Details</h2>
        <form className="needs-validation" noValidate> 
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" required onChange={(e)=> setName(e.target.value)} />
            <div className="valid-feedback">Looks good!</div>
          </div>
          {/* Rest of the form inputs */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="number" className="form-control" onChange={(e)=> setContact(e.target.value)} required />
            <div className="valid-feedback">Looks good!</div>
          </div>
          {/* Conditionally render spinner on submit button */}
          {loading ? (
            <div className="spinner-border text-info" role="status">
              
            </div>
          ) : (
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Create;
