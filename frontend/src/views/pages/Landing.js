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
import React, { useEffect, useRef, useState } from 'react';
import { json } from 'react-router-dom';
import classnames from 'classnames';
import { Modal } from 'bootstrap';

// reactstrap components
import { Button, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';

// index page sections
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import MovieList from 'components/Films/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, getGenres } from 'store/film-slice';
import SelectGenresModal from 'components/Modal/SelectGenresModal';
import { getAuthToken } from 'util/auth';
import { getUserData } from 'store/user-slice';
import { getPaginatedFilms } from 'store/film-slice';
import { filmActions } from 'store/film-slice';

function Landing() {
  // const { films } = useLoaderData();
  const [state, setState] = useState({ searchFocused: false });
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const { films, isLoading, genres } = useSelector((state) => state.film);
  const { genreIsEmpty } = useSelector((state) => state.user);

  const modalRef = useRef(null);

  useEffect(() => {
    // if (films.length === 0) {
    //   dispatch(getPaginatedFilms(1));
    // }

    if (genres.length === 0) {
      dispatch(getGenres());
    }

    const token = getAuthToken();

    if (token) {
      dispatch(getUserData());
    }

    console.log(genreIsEmpty);

    if (token && token !== 'EXPIRED' && genreIsEmpty) {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      modal.show();
    }
  }, [dispatch, genreIsEmpty, genres]);

  const handleSearch = () => {
    // dispatch(getFilms(searchParams));
    dispatch(filmActions.setSearchParams(searchText));
    dispatch(filmActions.setSelectedPage(1));
  };

  return (
    <>
      <DemoNavbar />
      <main>
        <div className='position-relative'>
          {/* shape Hero */}
          <section className='section section-lg section-shaped pb-250'>
            <div className='shape shape-style-1 shape-default'>
              <span />
              <span />
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
                      Find and rate movies here <span>And get some recommendation of what to watch next!</span>
                    </h1>
                    <p className='lead text-white'>Get movie recommendation based on your personal interest.</p>
                  </Col>
                </Row>
                <Row className='mt-5 mb-5'>
                  <Col></Col>
                  <Col lg='4'>
                    <FormGroup
                      className={classnames({
                        focused: state.searchFocused,
                      })}
                    >
                      <InputGroup className='mb-4'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='ni ni-zoom-split-in' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder='Search' type='text' onFocus={(e) => setState({ searchFocused: true })} onBlur={(e) => setState({ searchFocused: false })} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <Button className='btn-sm btn-success' onClick={handleSearch}>
                          Search
                        </Button>
                      </InputGroup>
                    </FormGroup>
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
          {/* 1st Hero Variation */}
        </div>
        {/* Movie list section */}
        {/* {isLoading ? <p className='text-center my-5'>Loading...</p> : <MovieList data={films} />} */}
        {isLoading ? <p className='text-center my-5'>Loading...</p> : <MovieList data={films} itemsPerPage={24} />}
      </main>
      <SimpleFooter />
      <SelectGenresModal innerRef={modalRef} options={genres} />
    </>
  );
}

export default Landing;

// async function loadMovies() {
//   const response = await fetch('http://localhost:5000/get-film');

//   if (!response.ok) {
//     throw json({ message: 'Could not fetch movies' }, { status: 500 });
//   } else {
//     const resData = await response.json();
//     return resData.data;
//   }
// }

// export function loader() {
//   return defer({
//     films: loadMovies(),
//   });
// }
