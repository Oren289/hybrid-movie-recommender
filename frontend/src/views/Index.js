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
import { Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmsByGenres } from 'store/film-slice';
import MovieRow from 'components/Films/MovieRow';
import { getCbfRecommendation } from 'store/recommendation-slice';
import { getTokenPayload } from 'util/auth';
import MovieRowArray from 'components/Films/MovieRowArray';
import { getHybridRecommendation } from 'store/recommendation-slice';

const Index = () => {
  const dispatch = useDispatch();
  const { actionFilms, horrorFilms, animationFilms, romanceFilms } = useSelector((state) => state.film);
  const { cbf_films, hybrid_films } = useSelector((state) => state.recommendation);

  useEffect(() => {
    async function getWatchedFilms() {
      const tokenPayload = getTokenPayload(localStorage.getItem('token'));

      if (tokenPayload) {
        const response = await fetch('http://localhost:5000/get-rated-films/' + tokenPayload.username, {
          method: 'GET',
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('Could not fetch films');
        } else {
          const resData = await response.json();
          if (resData.data.length > 0) {
            dispatch(getCbfRecommendation(resData.data));
            dispatch(getHybridRecommendation(resData.data));
          }
        }
      }
    }

    getWatchedFilms();
    dispatch(getFilmsByGenres());
  }, [dispatch]);

  return (
    <>
      {/* <DemoNavbar /> */}
      <main>
        <section className='section-profile-cover section-shaped pt-150'>
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
          <Container className='py-lg-md d-flex'>
            <div className='col px-0'>
              <Row>
                <Col lg='6'>
                  <h1 className='display-3 text-white'>
                    Don't know what to watch for the weekend? <span>Rate movies and get recommendation here!</span>
                  </h1>
                  <p className='lead text-white'>Get movie recommendation based on your personal interest.</p>
                </Col>
              </Row>
            </div>
          </Container>
          {/* SVG separator */}
          <div className='separator separator-bottom separator-skew'>
            <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' version='1.1' viewBox='0 0 2560 100' x='0' y='0'>
              <polygon className='fill-white' points='2560 0 2560 100 0 100' />
            </svg>
          </div>
        </section>
        <section className='section'>
          <Container>
            {hybrid_films.length > 0 && (
              <div className='mb-5'>
                <h4 className='font-weight-bold'>Recommended For You</h4>
                <MovieRowArray films={hybrid_films} />
              </div>
            )}
            {cbf_films.length > 0 && (
              <div className='mb-5'>
                <h4 className='font-weight-bold'>Films You Might Interested In</h4>
                <MovieRowArray films={cbf_films} />
              </div>
            )}
            <div className='mb-5'>
              <h4 className='font-weight-bold'>Most Popular Action Films</h4>
              <MovieRow films={actionFilms} />
            </div>
            <div className='mb-5'>
              <h4 className='font-weight-bold'>Most Popular Horror Films</h4>
              <MovieRow films={horrorFilms} />
            </div>
            <div className='mb-5'>
              <h4 className='font-weight-bold'>Most Popular Animation Films</h4>
              <MovieRow films={animationFilms} />
            </div>
            <div className='mb-5'>
              <h4 className='font-weight-bold'>Most Popular Romance Films</h4>
              <MovieRow films={romanceFilms} />
            </div>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Index;
