import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    // Initialize the state to an empty object so we can destructrue it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://obscure-sands-24856.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // this overrides the render() method of the superclass
  render() {

    // Before data is initially loaded
    const { movies, selectedMovie, onMovieClick, user } = this.state;
    if (onMovieClick) return <MovieView movie={onMovieClick} onBackClick={onMovieClick => { this.setSelectedMovie(onMovieClick); }} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Container className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} />
          : movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </Container>
    );
  }
}
