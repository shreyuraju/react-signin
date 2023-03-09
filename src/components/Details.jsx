import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
export default function Details() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const [login, setLogin] = useState([]);

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseView = () => {
    setShowView(false);
  };
  const handleShowView = () => {
    setShowView(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  let initValue;

  if (localStorage.getItem("users")) {
    initValue = JSON.parse(localStorage.getItem("users"));
  } else {
    initValue = [];
  }

  const [details, setDetails] = useState(initValue);

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

  const View = (val, index) => {
    handleShowView();
    console.log(val + " " + index);
  };

  const Edit = (val) => {
    handleShowEdit();
  };

  const Delete = (val) => {
    handleShowDelete();
  };

  const DeleteDetails = (index) => {
    console.log(details);
    details.pop(index);
    console.log(details);
    localStorage.setItem("users", JSON.stringify(details));

    handleCloseDelete();
  };

  useEffect(() => {
    setDetails(JSON.parse(localStorage.getItem("users")));

    CheckUser();
  }, []);

  return (
    <>
      {login.length === 0 ? (
        "error"
      ) : (
        <>
          <div>
            <h2 style={{ textAlign: "center" }}>User Details</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td colSpan="7">Total :{details.length}</td>

                  <td>
                    <button onClick={userLogout}>Logout</button>
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
                {details.map((item, index) => {
                  return (
                    <tr>
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
                            View(item.details.email, index);
                          }}
                        >
                          View
                        </Button>
                        <Modal show={showView} onHide={handleCloseView}>
                          <Modal.Header>
                            <Modal.Title>View</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <>
                              ID : {item.details.id} <br />
                              Name : {item.details.name} <br />
                              Email :{item.details.email} <br />
                              Password: {item.details.password} <br />
                            </>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseView}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            Edit(item.email, index);
                          }}
                        >
                          Edit
                        </Button>
                        <Modal show={showEdit} onHide={handleCloseView}>
                          <Modal.Header>
                            <Modal.Title>Edit</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <>
                              <form>
                                <input
                                  type="number"
                                  name="id"
                                  onChange={(e) => {
                                    this.setState({ id: e.target.value });
                                  }}
                                  className="mb-3 col-lg-8"
                                  placeholder="Enter Id"
                                  value={item.details.id}
                                  required
                                />

                                <input
                                  type="text"
                                  name="name"
                                  onChange={(e) => setName(e.target.value)}
                                  className="mb-3 col-lg-8"
                                  value={item.details.name}
                                  placeholder="Enter Name"
                                  required
                                />

                                <input
                                  type="email"
                                  name="email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="mb-3 col-lg-8"
                                  value={item.details.email}
                                  placeholder="Enter email"
                                  required
                                />

                                <input
                                  type="password"
                                  name="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="mb-3 col-lg-8"
                                  value={item.details.password}
                                  placeholder="Password"
                                  required
                                />
                              </form>
                            </>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseEdit}
                            >
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleCloseEdit}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            Delete(item.email, index);
                          }}
                        >
                          Delete
                        </Button>

                        <Modal show={showDelete} onHide={handleCloseDelete}>
                          <Modal.Header>
                            <Modal.Title>Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <>
                              ID : {item.details.id} <br />
                              Name : {item.details.name} <br />
                              Email :{item.details.email} <br />
                              Password: {item.details.password} <br />
                            </>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseDelete}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => DeleteDetails(index)}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
