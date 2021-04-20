import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration-view.scss";
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users", {
        Username: username,
        Password: password,
        Email: email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
        // The second argument '_self' is necessary so that
        // the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
        alert("Something wasn't entered right");
      });
  };

  return (
    <Form className="registration-form">
      <h2>Register</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired
//   }),
//   onRegistered: PropTypes.func
// }
