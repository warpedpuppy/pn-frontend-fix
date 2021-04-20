import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

// #0
import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileViewInfo } from "../profile-view-movies/profile-view-info";

export class MainView extends React.Component {
  signal = axios.CancelToken.source();

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null,
    };
  }

  getMovies(token) {
    axios
      .get("http://localhost:8080/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being cancelled");
  }
  // Logs user out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    alert("You have been logged out");
    window.open("/", "_self");
  }
  // Logs user in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // Updates user info
  onUpdatedUserInfo(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("user", authData.user.Username);
  }

  getUser(token) {
    let url = `http://localhost:8080/users/${localStorage.getItem(
      "user"
    )}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // #1
        this.state.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // #2
    const { movies } = this.props;
    const { user } = this.state;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to={`/userinfo/${user}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => this.onLoggedOut()}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
                return <MoviesList />
              // return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />

          <Route path="/register" render={() => <RegistrationView />} />

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />

          <Route
            path="/director/:name"
            render={({ match }) => {
              return (
                <DirectorView
                  movies={movies.find(
                    (m) => m.Director.Name === match.params.name
                  )}
                />
              );
            }}
          />

          <Route
            path="/genre/:name"
            render={({ match }) => {
              return (
                <GenreView
                  movies={movies.find(
                    (m) => m.Genre.Name === match.params.name
                  )}
                />
              );
            }}
          />

          <Route
            path="/user/:Username"
            render={() => {
              return (
                <ProfileView
                  movies={movies}
                  onUpdatedUserInfo={this.onUpdatedUserInfo}
                />
              );
            }}
          />

          <Route
            path="/userinfo/:Username"
            render={() => {
              return <ProfileViewInfo user={user} movies={movies} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #4
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
