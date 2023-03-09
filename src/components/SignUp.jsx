import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SignInimg from "./SignInimg";

export default function SignUp() {
    const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConpass] = useState("");

  let initValue;

  if (localStorage.getItem("users")) {
    initValue = JSON.parse(localStorage.getItem("users"));
  } else {
    initValue = [];
  }

  const [value, setValue] = useState(initValue);

  const InsertValue = (e) => {
    e.preventDefault();
    if (password == conPass) {
      if(password.length<5 && conPass.length<5){
        alert("passwaord should be more than 5 character ")
      } else {
        let details = {
          id: id,
          name: name,
          email: email,
          password: password,
        };
        let detail = {email:email, details} 
        setValue([...value, detail]);
        
        console.log(value);
      }
      
    } else {
      alert("Passwords are not matching");
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(value));
  }, [value]);

  return (
    <>
    <div className="container mt-3">
        <section className="d-flex justify-content-center">
          <div className="left_data mt-6 " style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign-UP</h3>
            <form onSubmit={InsertValue}>
              <input
                type="number"
                name="id"
                onChange={(e) => setId(e.target.value)}
                className="mb-3 col-lg-8"
                placeholder="Enter Id"
                required
              />

              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="mb-3 col-lg-8"
                placeholder="Enter Name"
                required
              />

              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 col-lg-8"
                placeholder="Enter email"
                required
              />

              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3 col-lg-8"
                placeholder="Password"
                required
              />

              <input
                type="password"
                name="conpass"
                onChange={(e) => setConpass(e.target.value)}
                className="mb-3 col-lg-8"
                placeholder="Confirm Password"
                required
              />
              <button className="mb-3 col-lg-8" style={{backgroundColor:"lightblue",background:'teal',color:'white'}}>
                Submit
              </button>
              <input
                type="reset"
                className="mb-3 col-lg-8"
                style={{ backgroundColor: "lightblue", backgroundColor:"lightblue",background:'teal',color:'white' }}
                value="Reset"
              />
            </form>
            <p className="mt-3">
              Already Signed-up <span><NavLink to="/signin">Sign-In</NavLink></span>
            </p>
          </div>
          <SignInimg />
        </section>
      </div>
    </>
  )
}
