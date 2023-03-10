import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Add() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //console.log(id+" "+name+" "+email+" "+password);

  const history = useNavigate();

  let initValue;

  if (localStorage.getItem("users")) {
    initValue = JSON.parse(localStorage.getItem("users"));
  } else {
    initValue = [];
  }

  const [value, setValue] = useState(initValue);

  const InsertValue = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      alert("passwaord should be more than 4 character ");
    } else {
      let details = {
        id: id,
        name: name,
        email: email,
        password: password,
      };
      let detail = { email: email, details };
      setValue([...value, detail]);
      console.log(value);
      alert("Details Add Successfully \nCLick on View Details Button")
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(value));
  }, [value]);

  return (
    <>
      <div className="container mt-3 col-lg-4">
        <Form onSubmit={InsertValue}>
          <Form.Group className="mb-3 ">
            <Form.Control
              type="number"
              name="id"
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Id"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button
            style={{ alignItems: "center" }}
            className="mb-3"
            variant="primary"
            onClick={(e) => InsertValue(e)}
          >
            Submit
          </Button>
          <Link to="/view">
          <Button
            style={{ alignItems: "center", marginLeft:"205px" }}
            className="mb-3"
            variant="primary"
            onClick={()=>history("/view")}
          >
            View Details
          </Button>
                  </Link>
        </Form>
      </div>
    </>
  );
}
