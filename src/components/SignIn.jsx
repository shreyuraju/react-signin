import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignInimg from "./SignInimg";

export default function SignIn() {
  //use of useNavigate is to navigate one Element to Another Element
  const history = useNavigate();

  //Global variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserdata] = useState([]);

  //cheking user data and logging in with local session
  const Check = (e) => {
    e.preventDefault();
    setUserdata(JSON.parse(localStorage.getItem("users")));
    const userSignin = userData.filter((val, key) => {
      return val.email === email && val.details.password === password;
    });

    if (userSignin.length === 0) {
      alert("try again with valid details");
    } else {
      localStorage.setItem("usersignin", JSON.stringify(userSignin));
      history("/view"); //Navigating to details page using useNavigate
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-center">
          <div className="left_data mt-6 " style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign-In</h3>
            <form onSubmit={Check}>
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
              <button
                className="mb-3 col-lg-8"
                style={{ backgroundColor: "lightblue" }}
              >
                Submit
              </button>
              <input
                type="reset"
                className="mb-3 col-lg-8"
                style={{ backgroundColor: "lightblue" }}
                value="Reset"
              />
            </form>
            {/* if user have no account, user can ahange page to sign-up */}
            <p className="mt-3">
              No Account{" "}
              <span>
                <NavLink to="/signup">Sign-Up</NavLink>
              </span>
            </p>
          </div>
          <SignInimg />
        </section>
      </div>
    </>
  );
}
