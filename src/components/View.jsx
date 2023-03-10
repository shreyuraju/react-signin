import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EdiText from "react-editext";

export default function View() {
  ///initializing old value
  let initValue;

  if (localStorage.getItem("users")) {
    initValue = JSON.parse(localStorage.getItem("users"));
  } else {
    initValue = [];
  }

  const [details, setDetails] = useState(initValue);

  //history to navigate another page
  const history = useNavigate();

  //login session
  const [login, setLogin] = useState([]);

  //checking user for login
  const CheckUser = () => {
    const getUser = localStorage.getItem("usersignin");
    if (getUser && getUser.length) {
      const user = JSON.parse(getUser);
      setLogin(user);

      if (login) {
        setTimeout(() => {}, 3000);
      }
    }
  };

  //user logout
  const userLogout = () => {
    localStorage.removeItem("usersignin");
    history("/signin");
  };

  //For Popup Modals
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);

  const [modalId, setModelid] = useState(0);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function ViewDiv(props) {
    setId(details[modalId].details.id);
    setName(details[modalId].details.name);
    setEmail(details[modalId].details.email);
    setPassword(details[modalId].details.password);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details of {email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{password}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleView = (i) => {
    setModalShowView(true);
    setModelid(i);
  };

  const saveEdit = () => {
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
      //setDetails([...details[modalId], detail]);
      console.log(detail);
      alert("Details Updated Successfully \nCLick on View Details Button");
    }
  };

  const seteId = (val) => {
    setId(val);
  };

  function EditDiv(props) {
    let editdetails = {
      id: id,
      name: name,
      email: email,
      password: password,
    };
    //console.log(editdetails);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit : {details[modalId].details.email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <EdiText
                    type="number"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    onSave={(v) => seteId(v.target.value)}
                  />
                </td>
                <td>
                  <EdiText
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    onSave={(v) => setName(v.target.value)}
                  />
                </td>
                <td>
                  <EdiText
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onSave={(v) => setEmail(v.target.value)}
                  />
                </td>
                <td>
                  <EdiText
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onSave={(v) => setPassword(v.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <p>Change all the data</p>
          <Button onClick={props.onHide}>Close</Button>
          <Button
            onClick={() => {
              saveEdit(modalId);
            }}
          >
            SaveChanges
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleEdit = (i) => {
    setModalShowEdit(true);
    setModelid(i);
  };

  const handleDelete = (i, email) => {
    let flag;
    flag = prompt("Do you want to delete  " + email + " data\nType yes");
    if (flag == "yes") {
      details.splice(i);
      localStorage.setItem("users", JSON.stringify(details));
      history("/view");
    } else {
      alert("Enter Properly as 'yes'");
    }
  };

  useEffect(() => {
    setDetails(JSON.parse(localStorage.getItem("users")));
    CheckUser();
  }, []);

  return (
    <>
      {login.length != 0 ? (
        <>
          <h2 style={{ textAlign: "center" }}>User Details</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>
                  <Link to="/view/add">
                    <Button variant="primary" size="sm">
                      Add Details
                    </Button>
                  </Link>
                </td>
                <td colSpan="6">Total :{details.length}</td>

                <td>
                  <Button variant="secondary" size="sm" onClick={userLogout}>
                    Logout
                  </Button>
                </td>
              </tr>

              <tr>
                <th>Sl no.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {details && details.length <= 0
                ? "NO data"
                : details.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.details.id}</td>
                        <td>{item.details.name}</td>
                        <td>{item.details.email}</td>
                        <td>{item.details.password}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              handleView(index);
                            }}
                          >
                            View
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              handleEdit(index);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              handleDelete(index, item.email);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
          <div>
            <ViewDiv
              show={modalShowView}
              onHide={() => setModalShowView(false)}
            />
            <EditDiv
              show={modalShowEdit}
              onHide={() => setModalShowEdit(false)}
            />
          </div>
        </>
      ) : (
        "error"
      )}
    </>
  );
}
