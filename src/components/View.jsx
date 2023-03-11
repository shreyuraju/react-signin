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

  const [value, setValue] = useState(initValue);

  //signin sessions
  let initLoginValue;
  if (localStorage.getItem("usersignin")) {
    initLoginValue = JSON.parse(localStorage.getItem("usersignin"));
  } else {
    initLoginValue = [];
  }

  //login session
  const [login, setLogin] = useState([]);
  const [getUser, setUser] = useState(initLoginValue);
  //checking user for login
  const CheckUser = () => {
    if (getUser && getUser.length) {
      const user = getUser;
      setLogin(user);
      if (login) {
        setTimeout(() => {}, 3000);
      }
    }
  };

  //history to navigate another page
  const history = useNavigate();

  //user logout
  const userLogout = () => {
    localStorage.removeItem("usersignin");
    history("/signin");
  };

  //For Popup Modals
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);

  const [modalId, setModelid] = useState(0);

  function ViewDiv(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details of {value[modalId].details.email}
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
                <td>{value[modalId].details.id}</td>
                <td>{value[modalId].details.name}</td>
                <td>{value[modalId].details.email}</td>
                <td>{value[modalId].details.password}</td>
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

  function EditDiv(props) {
    const saveEdit = (i) => {
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
        value[i]= detail
        setValue([...value])
        alert("Details Updated Successfully \nCLick on View Details Button");
      }
    };


    //handling Multiple Events
    const handleEditId = (v) => {
      setId(v);
    };
    const handleEditName = (v) => {
      setName(v);
    };
    const handleEditEmail = (v) => {
      setEmail(v);
    };
    const handleEditPassword = (v) => {
      setPassword(v);
    };

    const [id, setId] = useState(value[modalId].details.id);
    const [name, setName] = useState(value[modalId].details.name);
    const [email, setEmail] = useState(value[modalId].details.email);
    const [password, setPassword] = useState(value[modalId].details.password);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit : {value[modalId].details.email}
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
                    id="eid"
                    value={id}
                    onSave={handleEditId}
                  />
                </td>
                <td>
                  <EdiText
                    type="text"
                    id="ename"
                    value={name}
                    onSave={handleEditName}
                  />
                </td>
                <td>
                  <EdiText
                    type="email"
                    id="eemail"
                    value={email}
                    onSave={handleEditEmail}
                  />
                </td>
                <td>
                  <EdiText
                    type="password"
                    id="epass"
                    value={password}
                    onSave={handleEditPassword}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to Close */}
          <Button onClick={props.onHide}>Close</Button>
          {/* Button to Submit */}
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
    if (flag === "yes") {
      if (value.length > 1) {
        value.splice(i);
        localStorage.setItem("users", JSON.stringify(value));
        history("/view");
      } else {
        if (value.length > 0) {
          let flag = prompt(
            "THis the last Data Available\nDo You Want CONTINUE type 'yes'"
          );
          if (flag) {
            value.splice(i);
            getUser.splice(0);
            localStorage.setItem("usersignin", JSON.stringify(getUser));
            localStorage.setItem("users", JSON.stringify(value));
            history("/view");
          }
        }
      }
    } else {
      alert("Enter Properly as 'yes'");
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(value));
    CheckUser();
  }, [value]);

  return (
    <>
      {login.length !== 0 ? (
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
                <td colSpan="6">Total :{value.length}</td>

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
              {value && value.length <= 0
                ? "<>NO DATA</>"
                : value.map((item, index) => {
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
        <>
          <>ERROR No User Details recored</>
        </>
      )}
    </>
  );
}
