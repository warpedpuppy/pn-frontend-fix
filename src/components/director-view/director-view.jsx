import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';

import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies } = this.props;

    if (!movies) return null;
    // if (!movies) return null;

    
    return (
      <div className="director-view">
        <Card style={{ width: '18rem' }}>
          <Card.Title>{movies.Director.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movies.Director.Bio}</Card.Text>
            <Card.Text>Born: {movies.Director.Birth}</Card.Text>              
          </Card.Body>
        </Card>
      </div>
    );
  }
}

DirectorView.propTypes = {
  movies: PropTypes.shape({
    Director:  PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
  })
}