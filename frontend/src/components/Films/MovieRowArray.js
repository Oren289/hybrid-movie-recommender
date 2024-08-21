import React from 'react';
import './Films.css';
import { Col } from 'reactstrap';
import MovieCardArray from 'components/Cards/MovieCardArray';

const MovieRowArray = ({ films }) => {
  return (
    <div className='movie-container'>
      <div className='d-flex movie-list'>
        {films &&
          films.map((film) => (
            <Col lg='3' key={film[0]}>
              <MovieCardArray key_id={film[0]} film={film} title={film[1]} />
            </Col>
          ))}
      </div>
    </div>
  );
};

export default MovieRowArray;
