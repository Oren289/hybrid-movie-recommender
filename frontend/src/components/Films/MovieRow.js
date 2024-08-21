import MovieCard from 'components/Cards/MovieCard';
import React from 'react';
import './Films.css';
import { Col } from 'reactstrap';

const MovieRow = ({ films }) => {
  return (
    <div className='movie-container'>
      <div className='d-flex movie-list'>
        {films &&
          films.map((film) => (
            <Col lg='3' key={film.id}>
              <MovieCard key_id={film.id} film={film} />
            </Col>
          ))}
      </div>
    </div>
  );
};

export default MovieRow;
