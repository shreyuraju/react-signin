import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EdiText from "react-editext";

export default function View() {
  let initValue;

  if (localStorage.getItem("users")) {
    initValue = JSON.parse(localStorage.getItem("users"));
  } else {
    initValue = [];
  }

  const [details, setDetails] = useState(initValue);
  const history = useNavigate();
  const [login, setLogin] = useState([]);

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

  const userLogout = () => {
    localStorage.removeItem("usersignin");
    history("/signin");
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModelid] = useState(0);

  function ViewModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details of {details[modalId].details.email}
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
                <td>{details[modalId].details.id}</td>
                <td>{details[modalId].details.name}</td>
                <td>{details[modalId].details.email}</td>
                <td>{details[modalId].details.password}</td>
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
    setModalShow(true);
    setModelid(i);
  };

  function EditModal(props) {
    const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit {details[modalId].details.email}
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
                <td><EdiText type='number' onChange={(e) => setId(e.target.value)} value={details[modalId].details.id} /></td>
                <td><EdiText type='text' onChange={(e) => setName(e.target.value)} value={details[modalId].details.name} /></td>
                <td><EdiText type='email' onChange={(e) => setEmail(e.target.value)} value={details[modalId].details.email} /></td>
                <td><EdiText type='password' onChange={(e) => setPassword(e.target.value)} value={details[modalId].details.password} /></td>
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

  const handleEdit = (i) => {
    setModalShow(true);
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
      flag = prompt("Enter Properly as 'yes'");
      if (flag == "yes") {
        details.splice(i);
        localStorage.setItem("users", JSON.stringify(details));
        history("/view");
      } else {
        alert("Enter Properly as 'yes'");
      }
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
            <ViewModal show={modalShow} onHide={() => setModalShow(false)} />
            <EditModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </>
      ) : (
        "error"
      )}
    </>
  );
}
