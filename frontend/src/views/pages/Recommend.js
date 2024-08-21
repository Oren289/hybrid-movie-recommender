import MovieList from 'components/Films/MovieList';
import MovieRowArray from 'components/Films/MovieRowArray';
import SimpleFooter from 'components/Footers/SimpleFooter';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import { Col, Container, FormGroup, Row } from 'reactstrap';

const Recommend = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recommendationResult, setRecommendationResult] = useState([]);

  const loadOptions = async (searchParams, callback) => {
    try {
      const response = await fetch(`http://localhost:5000/get-film-dropdown/${searchParams}`);
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      callback(data.data);
    } catch (error) {
      console.error('Error fetching colour options:', error);
      callback([]);
    }
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = async () => {
    try {
      let queryParams = '';
      let paramsCount = 0;

      if (selectedOptions.length === 0) {
        return toast.error('No movie selected!', { position: 'bottom-right', autoClose: 2000, toastId: 'error-submit-rating-toast' });
      }

      selectedOptions.forEach((film) => {
        queryParams += `movies[]=${film.label}&`;
        paramsCount++;
      });
      const response = await fetch(`http://127.0.0.1:5000/movie/cbf?` + queryParams);

      if (!response.ok) {
        throw new Error('Could not fetch films');
      }

      const resData = await response.json();
      setRecommendationResult(resData.result.slice(paramsCount));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    console.log(recommendationResult);
  }, [recommendationResult]);

  return (
    <>
      {/* <DemoNavbar /> */}
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
                <Row className='pt-5'>
                  <Col>
                    <h1 className='display-3 text-white'>
                      Select your favorite movies <span>And get some recommendation of similar movies!</span>
                    </h1>
                    <p className='lead text-white'>Get some insights of what to watch next.</p>
                  </Col>
                </Row>
                <Row className='mt-5 mb-5 d-flex justify-content-center align-items-center'>
                  <Col lg='8'>
                    <AsyncSelect cacheOptions isMulti loadOptions={loadOptions} onChange={handleChange} defaultOptions />
                  </Col>
                  <Col lg='4' className='p-0 m-0'>
                    <button type='button' onClick={handleSubmit} className='btn btn-success'>
                      Recommend
                    </button>
                  </Col>
                </Row>
                <Row className='pt-5'>
                  <Container>
                    {recommendationResult.length === 0 ? (
                      <p className='text-center my-5 text-white'>Select some films to get recommendation</p>
                    ) : (
                      <div className='mb-5'>
                        <h4 className='font-weight-bold text-white'>Recommendation Result</h4>
                        <MovieRowArray films={recommendationResult} />
                      </div>
                    )}
                  </Container>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            {/* <div className='separator separator-bottom separator-skew'>
              <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' version='1.1' viewBox='0 0 2560 100' x='0' y='0'>
                <polygon className='fill-white' points='2560 0 2560 100 0 100' />
              </svg>
            </div> */}
          </section>
          {/* 1st Hero Variation */}
        </div>
        {/* Movie list section */}
        {/* {isLoading ? <p className='text-center my-5'>Loading...</p> : <MovieList data={films} />} */}
      </main>
      <SimpleFooter />
    </>
  );
};

export default Recommend;
