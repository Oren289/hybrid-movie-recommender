import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MovieCard from 'components/Cards/MovieCard';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { handlePaginationClick } from 'store/film-slice';
import { getPaginatedFilms } from 'store/film-slice';
import { filmActions } from 'store/film-slice';

function Films({ currentFilms }) {
  return (
    <>
      {currentFilms &&
        currentFilms.map((film) => (
          <Col lg='3' key={film.id}>
            <MovieCard key_id={film.id} film={film} />
            <p></p>
          </Col>
        ))}
    </>
  );
}

const MovieList = ({ data, itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);
  // const { itemOffset, selectedPage } = useSelector((state) => state.film);
  // const dispatch = useDispatch();

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentFilms = data.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % data.length;
  //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //   dispatch(handlePaginationClick(event.selected, newOffset));
  //   window.scrollTo({ top: 350 });
  // };

  const dispatch = useDispatch();

  // const [page, setPage] = useState(1);
  const { selectedPage, searchParams } = useSelector((state) => state.film);
  const [pageCount, setPageCount] = useState(0);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // dispatch(getPaginatedFilms(page));
    const fetchFilms = async (page, searchParams) => {
      try {
        const response = await fetch(`http://localhost:5000/get-paginated-films/${page}&${searchParams}`);
        if (!response.ok) {
          throw new Error('Could not fetch films');
        }

        const data = await response.json();
        setFilms(data.data);
        console.log(data.pagination);
        setPageCount(Math.ceil(data.pagination.pageCount));
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchFilms(selectedPage, searchParams);
    console.log(searchParams);
  }, [selectedPage, searchParams]);

  function handlePrevious() {
    // setPage((p) => {
    //   if (p === 1) return p;
    //   return p - 1;
    // });
    let p = selectedPage;
    console.log(p);
    if (p === 1) {
      return dispatch(filmActions.setSelectedPage(p));
    } else {
      dispatch(filmActions.setSelectedPage(p - 1));
      window.scrollTo({ top: 350 });
      return;
    }
  }

  function handleNext() {
    // setPage((p) => {
    //   if (p === pageCount) return p;
    //   return p + 1;
    // });
    let p = selectedPage;
    console.log(p);
    if (p === pageCount) {
      return dispatch(filmActions.setSelectedPage(p));
    } else {
      dispatch(filmActions.setSelectedPage(p + 1));
      window.scrollTo({ top: 350 });
      return;
    }
  }

  return (
    <section className='section section-lg pt-lg-0 mt--300'>
      <Container>
        <Row className='justify-content-center mb-4'>
          <Col lg='12'>
            <Row className='row-grid'>
              {/* {data.map((item) => (
                <Col lg='3'>
                  <MovieCard key={item._id} title={item.original_title} />
                </Col>
              ))} */}
              <Films id='films-list' currentFilms={films}></Films>
            </Row>
            <Row className='mt-5'>
              <div className='mx-auto'>
                <footer>
                  Page: {selectedPage}
                  <br />
                  Page count: {pageCount}
                  <br />
                  <button disabled={selectedPage === 1} onClick={handlePrevious}>
                    Previous
                  </button>
                  <button disabled={selectedPage === pageCount} onClick={handleNext}>
                    Next
                  </button>
                  <select
                    value={selectedPage}
                    onChange={(event) => {
                      // setPage(event.target.value);
                      dispatch(filmActions.setSelectedPage(parseInt(event.target.value)));
                      window.scrollTo({ top: 350 });
                    }}
                  >
                    {Array(pageCount)
                      .fill(null)
                      .map((_, index) => {
                        return <option key={index}>{index + 1}</option>;
                      })}
                  </select>
                </footer>
                {/* <ReactPaginate
                  initialPage={selectedPage}
                  breakLabel='...'
                  nextLabel='next >'
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel='< prev'
                  renderOnZeroPageCount={null}
                  containerClassName={'pagination'}
                  previousLinkClassName={'pagination__link'}
                  nextLinkClassName={'pagination__link'}
                  disabledClassName={'pagination__link--disabled'}
                  activeClassName={'pagination__link--active'}
                ></ReactPaginate> */}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MovieList;
