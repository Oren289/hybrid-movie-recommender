/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';

// reactstrap components
import { Card, Container, Row, Col, Badge } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { json, useRouteLoaderData } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import dateFormat from 'dateformat';
import moviePlaceholderImg from '../../assets/img/placeholder/movie-placeholder.png';
import RatingModal from 'components/Modal/RatingModal';
import { getTokenPayload } from 'util/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRating } from 'store/rating-slice';
import MovieRowArray from 'components/Films/MovieRowArray';
import { getCbfRecommendation } from 'store/recommendation-slice';

function FilmDetail() {
  // const [userRating, setUserRating] = useState();
  const dispatch = useDispatch();
  const { userRating } = useSelector((state) => state.rating);
  const { cbf_films } = useSelector((state) => state.recommendation);
  const [token, setToken] = useState('');

  const film = useRouteLoaderData('film-detail');
  const genres = JSON.parse(film.genres.replace(/'/g, '"'));
  const production_companies = JSON.parse(film.production_companies.replace(/'/g, '"'));
  const production_countries = JSON.parse(film.production_countries.replace(/'/g, '"'));
  const spoken_languages = JSON.parse(film.spoken_languages.replace(/'/g, '"'));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const tokenPayload = getTokenPayload(localStorage.getItem('token'));

    if (tokenPayload) {
      dispatch(getUserRating(film.id, tokenPayload.username));
      setToken(tokenPayload);
    }

    const recommendationData = [{ films: [{ title: film.title }] }];

    dispatch(getCbfRecommendation(recommendationData));
  }, [film, dispatch]);

  return (
    <>
      <DemoNavbar />
      <main className='film-detail-page'>
        <section className='section-profile-cover section-shaped my-0'>
          {/* Circles background */}
          <div className='shape shape-style-1 shape-default alpha-4'>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className='separator separator-bottom separator-skew'>
            <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' version='1.1' viewBox='0 0 2560 100' x='0' y='0'>
              <polygon className='fill-white' points='2560 0 2560 100 0 100' />
            </svg>
          </div>
        </section>
        <section className='section'>
          <Container>
            <Card className='card-film shadow mt--300'>
              <Row className='justify-content-start'>
                <Col className='order-lg-2' lg='3'>
                  <div className='card-film-image'>
                    {/* <img alt='...' className='' src={moviePlaceholderImg} style={{ objectFit: 'cover', objectPosition: 'center' }} /> */}
                    <img
                      alt='...'
                      className=''
                      src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = moviePlaceholderImg;
                      }}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                </Col>
                <Col className='order-lg-3 text-lg-left align-self-lg-center' lg='6' style={{ marginLeft: '4rem' }}>
                  <div className='card-film-actions py-4 mt-lg-0'>
                    <h3>{film ? film.title : ''}</h3>
                    <section>
                      {genres.map((genre) => (
                        <Badge color='primary' pill key={genre.id} className='mr-1'>
                          {genre.name}
                        </Badge>
                      ))}
                    </section>
                    <section className='mt-3 d-flex align-items-center'>
                      <Rating name='film-average-rating' value={parseFloat(film.vote_average)} max={10} precision={0.1} readOnly size='large'></Rating>
                      <span className='badge badge-secondary ml-1 font-weight-bold'>{film.vote_average}</span>
                    </section>
                    <section className='mt-5 d-flex'>
                      {token != '' && (
                        <button className='btn btn-sm btn-success' data-toggle='modal' data-target='#exampleModal' disabled={userRating ? true : false}>
                          <i className='fa-solid fa-circle-plus'></i> {userRating ? 'Watched' : 'Add To Watched List'}
                        </button>
                      )}
                      <div className='ml-2'>
                        <span style={{ fontSize: '0.8rem' }}>Your rating:</span>
                        {/* <span className='badge badge-secondary ml-1 font-weight-bold'>{film.vote_average}</span> */}
                        <span className='badge badge-secondary ml-1 font-weight-bold'>{userRating ? userRating * 2 : 'Not watched'}</span>
                      </div>
                    </section>
                  </div>
                </Col>
              </Row>
              <div className='mt-3 py-5 border-top'>
                <Container className='px-md-5'>
                  <Row className='justify-content-center'>
                    <Col lg='4' className=''>
                      <h6>Information</h6>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem' }}>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Production Companies: </span>
                          {production_companies.map(({ name }, index) => ` ${name}${index === production_companies.length - 1 ? '' : ','}`)}
                        </li>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Production Countries: </span>
                          {production_countries.map(({ name }, index) => ` ${name}${index === production_countries.length - 1 ? '' : ','}`)}
                        </li>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Release Date: </span>
                          {dateFormat(film.release_date, 'mediumDate')}
                        </li>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Runtime: </span>
                          {film.runtime + ' min'}
                        </li>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Language: </span>
                          {spoken_languages.map(({ name }, index) => ` ${name}${index === spoken_languages.length - 1 ? '' : ','}`)}
                        </li>
                        <li className='mb-1'>
                          <span className='font-weight-bold'>Status: </span>
                          {film.status}
                        </li>
                      </ul>
                    </Col>
                    <Col lg='8'>
                      <h6>Synopsis</h6>
                      <p>{film.overview}</p>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col>
                      <div className='mb-5'>
                        <h4 className='font-weight-bold'>Similar Movies</h4>
                        <MovieRowArray films={cbf_films} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              {/* <div className=' py-5 border-top'>
                <Row className='justify-content-center'>
                  <Container className='px-md-5'>
                    <Col>
                      <h6>Your Rating</h6>
                      
                    </Col>
                  </Container>
                </Row>
              </div> */}
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />

      {/* Rating Modal */}
      <RatingModal title={film.original_title} filmId={film.id} _id={film._id}></RatingModal>
    </>
  );
}

export default FilmDetail;

async function loadMovies(id) {
  const response = await fetch('http://localhost:5000/get-film/detail/' + id);

  if (!response.ok) {
    throw json({ message: 'Could not fetch selected film.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export async function loader({ request, params }) {
  const id = params.id;

  const film = await loadMovies(id);

  return json(film, { status: 200 });
}
