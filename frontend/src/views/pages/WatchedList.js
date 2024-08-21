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

// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

import { Modal } from 'bootstrap';
import DataTable from 'react-data-table-component';
import { Link, json, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTokenPayload } from 'util/auth';
import ConfirmModal from 'components/Modal/ConfirmModal';
import UpdateRatingModal from 'components/Modal/UpdateRatingModal';
import moviePlaceholderImg from '../../assets/img/placeholder/movie-placeholder.png';

function WatchedList() {
  const films = useRouteLoaderData('my-watched-list');
  const [ratingModalData, setRatingModalData] = useState({ rating: '', title: '', filmId: '', _id: '' });
  const [filmData, setFilmData] = useState([]);
  const [clickedId, setClickedId] = useState('');

  const modalRef = useRef(null);
  const ratingModalRef = useRef(null);

  useEffect(() => {
    const populateFilmData = () => {
      films.forEach((film) => {
        setFilmData((filmData) => [
          ...filmData,
          {
            _id: film._id,
            poster_path: film.films[0].poster_path,
            title: film.films[0].title,
            filmId: film.films[0].id,
            rating: film.rating,
          },
        ]);
      });
    };

    populateFilmData();
  }, [films]);

  const handleOpenModal = (_id) => {
    setClickedId(_id);
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleOpenRatingModal = (rating, title, filmId, _id) => {
    setRatingModalData({ ...ratingModalData, rating, title, filmId, _id });
    console.log(ratingModalData);
    const modalElement = ratingModalRef.current;
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleDeleteRating = async (id) => {
    const response = await fetch('http://localhost:5000/delete-rated-films/' + id, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    setFilmData((filmData) =>
      filmData.filter((data) => {
        return data._id !== id;
      })
    );

    toast.success('Rating deleted!', { position: 'bottom-right', autoClose: 2000, toastId: 'delete-rating-toast' });
  };

  const columns = [
    {
      name: 'Poster',
      width: '10rem',
      cell: (row) => (
        <Link to={`/films/${row.filmId}`}>
          <img
            width='100rem'
            alt={row.title}
            src={`https://image.tmdb.org/t/p/original${row.poster_path}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = moviePlaceholderImg;
            }}
          />
        </Link>
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'My Rating',
      selector: (row) => row.rating * 2,
      sortable: true,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className='d-flex justify-content-between align-items-center'>
          <button className='btn btn-primary btn-sm' onClick={() => handleOpenRatingModal(row.rating, row.title, row.filmId, row._id)}>
            <i className='fa-solid fa-pen-to-square'></i>
          </button>
          <button className='btn btn-danger btn-sm' onClick={() => handleOpenModal(row._id)}>
            <i className='fa-solid fa-trash'></i>
          </button>
        </div>
      ),
    },
  ];

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
            <Card className='card-profile shadow mt--500'>
              <div className='px-5'>
                <Row>
                  <h4 className='font-weight-bold py-3'>My Watched List</h4>
                </Row>
                <Row>
                  <DataTable columns={columns} data={filmData} striped='true' pagination='true' pointerOnHover='true' />
                </Row>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
      <ConfirmModal innerRef={modalRef} title='Delete Confirmation' text='Are you sure want to delete rating of this film?' action={() => handleDeleteRating(clickedId)} />
      <UpdateRatingModal innerRef={ratingModalRef} rating={ratingModalData.rating} title={ratingModalData.title} filmId={ratingModalData.filmId} _id={ratingModalData._id} />
    </>
  );
}

export default WatchedList;

async function loadMovies(userId) {
  const response = await fetch('http://localhost:5000/get-rated-films/' + userId, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch selected film.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export async function loader({ request, params }) {
  const tokenPayload = getTokenPayload(localStorage.getItem('token'));

  const film = await loadMovies(tokenPayload.username);

  return json(film, { status: 200 });
}
