import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";
import axios from "axios";

import { Card, Button, Image } from "react-bootstrap";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  backButton = () => {
    let history = useHistory();

    function handleClick() {
      history.push("");
    }
  };

  addToFav(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://obscure-sands-24856.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .post(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
      });
    alert("Added to the list!");
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view movie-border">
        <Card style={{ width: "50rem" }}>
          <Image className="movie-poster" src={movie.ImagePath} rounded />
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          </Card.Body>
        </Card>
        <Card.Footer style={{ width: "50rem" }}>
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button variant="secondary" onClick={() => this.addToFav(movie)}>
            Add to Favorites
          </Button>
          <Button onClick={() => this.backButton(history)}>
            Back to previous
          </Button>
        </Card.Footer>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
  }),
};
