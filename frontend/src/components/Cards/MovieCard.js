import React, { useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ key_id, film }) => {
  const movieImg = `https://image.tmdb.org/t/p/original${film.poster_path}` || 'https://critics.io/img/movies/poster-placeholder.png';

  return (
    <Link to={`/films/${key_id.toString()}`}>
      <Card
        className='card-zoom--hover shadow border-0 mt-4 movie-card'
        key={key_id}
        style={{ background: `url('https://critics.io/img/movies/poster-placeholder.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <CardBody className='p-0 d-flex flex-column justify-content-end' style={{ background: `url(${movieImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <div className='title-panel'>
            <h6 className='text-camelcase card-movie-title'>{film.title}</h6>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default MovieCard;
