import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';

import {Card} from 'react-bootstrap';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies } = this.props;

    if (!movies) return <p>:')</p>;

    
    return (
      <div className="genre-view">
        <Card border="primary" style={{ width: '18rem' }}>
          <Card.Title>{movies.Genre.Name}</Card.Title>
          <Card.Body>
            <Card.Text>{movies.Genre.Description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    },
  })
}