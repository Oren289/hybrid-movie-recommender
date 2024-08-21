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
import { Card, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'store/user-slice';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getGenres } from 'store/film-slice';
import { userActions } from 'store/user-slice';
import { toast } from 'react-toastify';

const animatedComponents = makeAnimated();

function Profile() {
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state.film);
  const { username, email, preferredGenres } = useSelector((state) => state.user);

  const handleGenresSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        genres: preferredGenres,
      };

      const response = await fetch('http://localhost:5000/store-user-genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Genres saved!', { position: 'bottom-right', autoClose: 2000, toastId: 'select-genres-toast' });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getUserData());
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);

  return (
    <>
      <DemoNavbar />
      <main className='profile-page'>
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
            <Card className='card-profile shadow mt--300'>
              <div className='px-4'>
                <Row className='justify-content-center'>
                  <Col className='order-lg-2' lg='3'>
                    <div className='card-profile-image'>
                      <a href='#pablo' onClick={(e) => e.preventDefault()}>
                        <img alt='...' className='rounded-circle' src={require('assets/img/theme/profile-pic.jpg')} />
                      </a>
                    </div>
                  </Col>
                  <Col className='order-lg-3 text-lg-right align-self-lg-center' lg='4'>
                    <div className='card-profile-actions py-4 mt-lg-0'>
                      {/* <Button className='mr-4' color='info' href='#pablo' onClick={(e) => e.preventDefault()} size='sm'>
                        Connect
                      </Button>
                      <Button className='float-right' color='default' href='#pablo' onClick={(e) => e.preventDefault()} size='sm'>
                        Message
                      </Button> */}
                    </div>
                  </Col>
                  <Col className='order-lg-1' lg='4'>
                    <div className='card-profile-stats d-flex justify-content-center'>
                      <div>
                        <span className='heading'>0</span>
                        <span className='description'>Watched Movies</span>
                      </div>
                      <div>
                        <span className='heading'>0</span>
                        <span className='description'>Avg. Rating</span>
                      </div>
                      <div>
                        <span className='heading'>0</span>
                        <span className='description'>Comments</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className='text-center mt-3'>
                  <h3>{username ? username : ''}</h3>
                  <div className='h6 font-weight-300'>
                    <i className='ni location_pin mr-2' />
                    {email ? email : ''}
                  </div>
                </div>
                <div className='mt-5 py-5 border-top'>
                  <Row className='justify-content-center'>
                    <Col lg='9'>
                      <h5>User Preferred Genres</h5>
                      <p>Select several genres based on your personal interest. This selection will help us to determine the movie recommendation to you.</p>
                      <Row className='align-items-center'>
                        <Col lg='10'>
                          <Select
                            closeMenuOnSelect={false}
                            onChange={(genre) => dispatch(userActions.setPreferredGenres(genre))}
                            value={preferredGenres}
                            components={animatedComponents}
                            isMulti
                            options={genres}
                            className='basic-multi-select'
                            classNamePrefix='select'
                          />
                        </Col>
                        <Col lg='2' className='m-0 p-0'>
                          <button type='button' className='btn btn-primary' onClick={handleGenresSubmit}>
                            Save
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div className='mt-3 py-5 border-top'>
                  <Row className='justify-content-center'>
                    <Col lg='9'>
                      <p>
                        An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                      </p>
                      <a href='#pablo' onClick={(e) => e.preventDefault()}>
                        Show more
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Profile;
