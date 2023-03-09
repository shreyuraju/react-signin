import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignInimg from "./SignInimg";

export default function SignIn() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserdata] = useState([]);

  const Check = (e) => {
    e.preventDefault();
    setUserdata(JSON.parse(localStorage.getItem("users")));

    //console.log(userData);

    const userSignin = userData.filter((val, key) => {
      //console.log(val.email);
      //console.log(val.details.password);
      
      return val.email === email && val.details.password === password;
    });
    //console.log(userSignin)

    if (userSignin.length === 0) {
      alert("invalid details");
    } else {
      localStorage.setItem("usersignin", JSON.stringify(userSignin));
      history("/details"); //Navigating to details page using useNavigate
      //alert("User Signed in Successfully")
    }

    //console.log(userSignin);
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
