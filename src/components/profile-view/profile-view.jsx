import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./profile-view.scss";
import axios from "axios";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = (e) => {
    let user=localStorage.getItem("user")
    let token=localStorage.getItem("token")
    e.preventDefault();
    let data = {
      Username: username,
      Password: password,
      Email: email,
    }
    axios
      .put(
        `http://localhost:8080/users/${user}`,
        data,
        {
           headers: { Authorization: `Bearer ${token}`},
        }
      )
      .then((response) => {
        const data = response.data;
        props.onUpdatedUserInfo(data);
        console.log(data);
        alert("Updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Form className="profile-form">
        <h2>Want to change some info?</h2>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </div>
  );
}

//   componentDidMount() {
//     let accessToken = localStorage.getItem('token');
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem('user')
//       });
//       this.getUser(accessToken);
//     }
//   }

//   getUser(token) {
//     let url = 'http://localhost:8080/users/' +
//     localStorage.getItem("user");
//     axios.get(url, {headers: {Authorization: `Bearer ${token}`}
//     })
//     .then(response => {
//       this.setState({
//         // Returns a null user
//         Username: response.data.Username,
//         Email: response.data.Email,
//         FavoriteMovies: response.data.FavoriteMovies
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
